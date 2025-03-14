import { body } from "express-validator";
import { validateRequest } from "./authValidators";

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
