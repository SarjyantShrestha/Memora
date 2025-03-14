import { body, query, param } from "express-validator";
import { validateRequest } from "./authValidators";

export const createNoteValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long."),

  body("content")
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long."),

  body("categoryIds")
    .optional()
    .isArray({ min: 1 })
    .withMessage(
      "Category IDs must be an array with at least one category ID.",
    ),
  validateRequest,
];

export const getAllNotesValidation = [
  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt", "title"])
    .withMessage("SortBy must be one of 'createdAt', 'updatedAt', or 'title'.")
    .default("createdAt"),

  query("orderBy")
    .optional()
    .isIn(["ASC", "DESC"])
    .withMessage("OrderBy must be 'ASC' or 'DESC'.")
    .default("DESC"),
  validateRequest,
];

export const updateNoteValidation = [
  param("noteId").isInt().withMessage("Note ID must be an integer."),

  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long."),

  body("content")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long."),

  body("categoryIds")
    .optional()
    .isArray()
    .withMessage("Category IDs must be an array."),
  validateRequest,
];

export const deleteNoteValidation = [
  param("noteId").isInt().withMessage("Note ID must be an integer."),
  validateRequest,
];

// Sorting Validation
export const sortNotesValidation = [
  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt", "title"])
    .withMessage("Invalid sort parameter"),
];
