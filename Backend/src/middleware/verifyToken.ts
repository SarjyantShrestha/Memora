import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Access token is required." });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};
