import { body, param } from "express-validator";
import { validateRequest } from "../validateRequest";

// Create Category Validation
export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters."),
  validateRequest,
];

// Update Category Validation
export const updateCategoryValidation = [
  param("categoryId")
    .isInt()
    .withMessage("Category ID must be a valid integer."),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters."),
  validateRequest,
];

// Delete Category Validation
export const deleteCategoryValidation = [
  param("categoryId")
    .isInt()
    .withMessage("Category ID must be a valid integer."),
  validateRequest,
];
