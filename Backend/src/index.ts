import express from "express";
import cors from "cors";

import { AppDataSource } from "./initializers/data-source";
import OtpRouter from "./routes/otpRoute";
import AuthRoutes from "./routes/authRoutes";

const port: number = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/otp", OtpRouter);
app.use("/api/user", AuthRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  })
  .catch((error) => console.log(error));
