import { body } from "express-validator";
import { validateRequest } from "../validateRequest";

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
