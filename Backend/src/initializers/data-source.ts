import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Otp } from "../models/Otp";
import dotenv from "dotenv";

dotenv.config();

//Database Connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Otp],
  migrations: [],
  subscribers: [],
});
