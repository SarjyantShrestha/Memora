import { NextFunction, Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";

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
