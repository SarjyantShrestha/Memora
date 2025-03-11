import { AppDataSource } from "./config/data-source";
import express from "express";
import cors from "cors";

const port: number = 5000;
const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  })
  .catch((error) => console.log(error));
