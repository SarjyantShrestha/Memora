import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { AppDataSource } from "./initializers/data-source";
import { verifyToken } from "./middleware/verifyToken";
import OtpRouter from "./routes/otpRoute";
import AuthRoutes from "./routes/authRoutes";

const port: number = 5000;
const app = express();

// Middleware setup
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use("/api/otp", OtpRouter); // OTP routes
app.use("/api/auth", AuthRoutes); // Auth routes

// Protected route
app.get("/protected", verifyToken, (req: Request, res: Response): any => {
  try {
    return res.status(200).json({
      message: "You have access to the protected route!",
      user: (req as any).user, // Access the decoded user data from the token
    });
  } catch (error) {
    console.error("Error accessing protected route:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Database connection and server start
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  })
  .catch((error) => console.log(error));
