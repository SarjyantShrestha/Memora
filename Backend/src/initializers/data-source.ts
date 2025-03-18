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
  synchronize: false,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});
