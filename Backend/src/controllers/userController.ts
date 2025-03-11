import { User } from "../models/User";
import { Request, Response } from "express";

import { AppDataSource } from "../initializers/data-source";

const userRepo = AppDataSource.getRepository(User);

export const saveUser = async (req: Request, res: Response) => {
  const { email } = req.body;
};
