import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
} from "../utils/validators/categoryValidators";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllCategories);
router.post("/", verifyToken, createCategoryValidation, createCategory);
router.put(
  "/:categoryId",
  verifyToken,
  updateCategoryValidation,
  updateCategory,
);
router.delete(
  "/:categoryId",
  verifyToken,
  deleteCategoryValidation,
  deleteCategory,
);

export default router;

/**
 * @swagger
 * tags:
 *   - Categories
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories for a user
 *     description: Fetches all categories for the authenticated user.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       400:
 *         description: No categories found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category for the authenticated user.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category to be created
 *                 example: "Technology"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid category data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/categories/{categoryId}:
 *   put:
 *     summary: Update an existing category
 *     description: Updates the name of an existing category for the authenticated user.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the category
 *                 example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data or category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category for the authenticated user.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
