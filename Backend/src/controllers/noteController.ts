import { Request, Response } from "express";
import { Note } from "../models/Note";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { In } from "typeorm";

//Create note
export const createNote = async (req: Request, res: Response) => {
  const { title, content, categoryIds } = req.body;
  const userId = (req as any).user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Create Note
    const note = new Note();
    note.title = title;
    note.content = content;
    note.user = user;

    // Add categories if provided
    if (categoryIds && categoryIds.length > 0) {
      const categories = await Category.findBy({
        id: In(categoryIds),
        user: { id: userId },
      });

      // Check if all requested categories were found
      if (categories.length !== categoryIds.length) {
        const foundCategoryIds = categories.map((category) => category.id);
        const missingCategoryIds = categoryIds.filter(
          (id: number) => !foundCategoryIds.includes(id),
        );

        res.status(400).json({
          message: "One or more categories do not exist.",
          missingCategoryIds,
        });
        return;
      }

      note.categories = categories;
    } else {
      note.categories = [];
    }

    await note.save();

    res.status(201).json({
      message: "Note created successfully.",
      note: {
        ...note,
        categories: note.categories.map((category) => ({
          id: category.id,
          name: category.name,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

// Get All Notes with Sorting
export const getAllNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  //Default Values
  const {
    sortBy = "createdAt",
    orderBy = "DESC",
    page = 1,
    limit = 10,
    category = "", // Add category filter parameter
    search = "",
  } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    // Build query based on parameters
    const queryBuilder = Note.createQueryBuilder("note")
      .leftJoinAndSelect("note.categories", "category")
      .where("note.user.id = :userId", { userId });

    // Apply search filter
    if (search) {
      queryBuilder.andWhere(
        "(note.title LIKE :search OR note.content LIKE :search)",
        { search: `%${search}%` },
      );
    }

    // Apply category filter
    if (category) {
      queryBuilder.andWhere("category.name = :category", { category });
    }

    // Apply sorting
    if (sortBy === "category") {
      // When sorting by category, we need to join with categories
      queryBuilder.orderBy("category.name", orderBy as "ASC" | "DESC");
    } else {
      // For other fields, sort directly on the note table
      queryBuilder.orderBy(`note.${sortBy}`, orderBy as "ASC" | "DESC");
    }

    // Apply pagination
    queryBuilder.skip(skip).take(Number(limit));

    // Execute query
    const notes = await queryBuilder.getMany();

    // Format response
    const formattedNotes = notes.map((note) => ({
      ...note,
      categories: note.categories
        .map((category) => category.name)
        .sort((a, b) => a.localeCompare(b)), // sort category alphabetically
    }));

    res.status(200).json({ notes: formattedNotes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

// Get a Single Note by ID
export const getNoteById = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
      relations: ["categories"],
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching note", error: error.message });
  }
};

//Update a Note
export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { title, content, categoryIds } = req.body;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
      relations: ["categories"],
    });
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    //update note data
    note.title = title || note.title;
    note.content = content || note.content;

    if (categoryIds) {
      const categories = await Category.find({
        where: {
          id: In(categoryIds),
          user: { id: userId },
        },
      });
      note.categories = categories;
    }

    await note.save();
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
};

//Delete a Note
export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    await note.remove();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
