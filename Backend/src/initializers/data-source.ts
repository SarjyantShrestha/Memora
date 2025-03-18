import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Otp } from "../models/Otp";
import { Category } from "../models/Category";
import { Note } from "../models/Note";

dotenv.config();

//Database Connection
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT) || 5432,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Otp, Category, Note],
  migrations: [],
  subscribers: [],
});
