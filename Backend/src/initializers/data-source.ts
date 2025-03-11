import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Otp } from "../models/Otp";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rapzy",
  password: "yempeayes",
  database: "memora",
  synchronize: true,
  logging: false,
  entities: [User, Otp],
  migrations: [],
  subscribers: [],
});
