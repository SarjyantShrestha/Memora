import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import { setupSwagger, swaggerSpec } from "./utils/swagger";

import { AppDataSource } from "./initializers/data-source";
import { verifyToken } from "./middleware/verifyToken";
import OtpRouter from "./routes/otpRoutes";
import AuthRoutes from "./routes/authRoutes";
import CategoryRoutes from "./routes/categoryRoutes";
import NoteRoutes from "./routes/noteRoutes";

const port: number = 5000;
const app = express();

// Middleware setup
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Swagger documentation
setupSwagger(app);

// Routes setup
app.use("/api/v1/otp", OtpRouter); // OTP routes
app.use("/api/v1/auth", AuthRoutes); // Auth routes
app.use("/api/v1/categories", CategoryRoutes); // Category routes
app.use("/api/v1/notes", NoteRoutes); // Category routes

// Serve Swagger UI docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
