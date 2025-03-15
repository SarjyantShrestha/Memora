import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Validate and handle errors
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg; // Get the first error message
    res.status(400).json({ message: errorMessage }); // Send a single error message
    return;
  }
  next();
};
