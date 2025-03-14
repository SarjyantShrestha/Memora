import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

// Validate and handle errors
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// Register Validation
export const registerValidation = [
  body("name")
    .isString()
    .withMessage("Name should be a string.")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ max: 50 })
    .withMessage("Name should not be longer than 50 characters."),
  body("email")
    .isEmail()
    .withMessage("Invalid email format.")
    .notEmpty()
    .withMessage("Email is required."),
  body("password")
    .isString()
    .withMessage("Password should be a string.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character."),
  body("confirm_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
  validateRequest,
];

// Login Validation
export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format.")
    .notEmpty()
    .withMessage("Email is required."),
  body("password")
    .isString()
    .withMessage("Password should be a string.")
    .notEmpty()
    .withMessage("Password is required."),
  validateRequest,
];

// Email validation
export const emailValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format.")
    .notEmpty()
    .withMessage("Email is required."),
  validateRequest,
];

// Verify OTP validation
export const otpValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format.")
    .notEmpty()
    .withMessage("Email is required."),
  body("otp")
    .isNumeric()
    .withMessage("OTP must be a numeric value.")
    .notEmpty()
    .withMessage("OTP is required."),
  validateRequest,
];

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
