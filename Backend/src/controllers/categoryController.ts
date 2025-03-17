import { Request, Response } from "express";
import { Category } from "../models/Category";
import { User } from "../models/User";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = (req as any).user.id;

  console.log(
    `User with ID ${userId} is creating a category with name: ${name}`,
  );

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      console.log(`User with ID ${userId} not found`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Create category
    const category = new Category();
    category.name = name;
    category.user = user;

    // Save category
    await category.save();

    console.log(
      `Category with name ${name} created successfully for user ${userId}`,
    );

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
    return;
  } catch (error) {
    console.log("Error creating category:", error.message);
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
    return;
  }
};

// Get all categories for a specific user
export const getAllCategories = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  console.log(`User with ID ${userId} is fetching their categories`);

  try {
    const categories = await Category.find({
      where: { user: { id: userId } },
      order: { name: "ASC" },
    });

    if (!categories || categories.length == 0) {
      console.log(`No categories found for user ${userId}`);
      res.status(400).json({ message: "No categories found." });
      return;
    }

    console.log(`Fetched ${categories.length} categories for user ${userId}`);

    res.status(200).json({ categories });
    return;
  } catch (error) {
    console.log("Error fetching categories:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
    return;
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  const { name } = req.body;
  const userId = (req as any).user.id;

  console.log(
    `User with ID ${userId} is updating category ID ${categoryId} to name: ${name}`,
  );

  try {
    // Find the category
    const category = await Category.findOne({
      where: { id: categoryId, user: { id: userId } },
    });
    if (!category) {
      console.log(
        `Category with ID ${categoryId} not found for user ${userId}`,
      );
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Update the category
    category.name = name;
    await category.save();

    console.log(
      `Category ID ${categoryId} updated successfully for user ${userId}`,
    );

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
    return;
  } catch (error) {
    console.log("Error updating category:", error.message);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
    return;
  }
};

// Delete a Category
export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  const userId = (req as any).user.id;

  console.log(
    `User with ID ${userId} is attempting to delete category ID ${categoryId}`,
  );

  try {
    // Find the category
    const category = await Category.findOne({
      where: { id: categoryId, user: { id: userId } },
    });
    if (!category) {
      console.log(
        `Category with ID ${categoryId} not found for user ${userId}`,
      );
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Delete the category
    await category.remove();

    console.log(
      `Category ID ${categoryId} deleted successfully for user ${userId}`,
    );

    res.status(200).json({ message: "Category deleted successfully" });
    return;
  } catch (error) {
    console.log("Error deleting category:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
    return;
  }
};
