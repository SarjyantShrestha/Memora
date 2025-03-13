import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
// import { Otp } from "../models/Otp";
// import { AppDataSource } from "../initializers/data-source";
import { validateEmail, validatePassword } from "../utils/validators";
import { generateAndSendOtp } from "../utils/generateAndSendOtp";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} from "../initializers/jwtInitializers";

// const otpRepo = AppDataSource.getRepository(Otp);

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(404).json({
        message:
          "User hasn't been verified. Please register again and verify OTP.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_REFRESH_SECRET,
      {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
      },
    );

    // Store refresh token in an httpOnly cookie (more secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: "strict",
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token required" });
    }

    //verify refresh token
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );

      return res.json({ accessToken: newAccessToken });
    });
  } catch (error) {}
};

// Register new user
export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, confirm_password } = req.body;

  // Validate confirm_password
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  //Validate the email and password
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters long, contain an uppercase letter, a number, and a special character.",
    });
  }

  try {
    //Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (existingUser.isVerified) {
        // If user exists and is verified, return error for login
        return res
          .status(400)
          .json({ message: "User already exists. Please proceed with login." });
      } else {
        // If user exists but not verified, update user details
        existingUser.name = name;
        existingUser.password = password; // Password will be hashed automatically

        await existingUser.save();
        await generateAndSendOtp(email);

        return res.status(200).json({ message: "User updated successfully!" });
      }
    }

    //Create and save the new user
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password; // Password is hashed automatically in the User entity

    await user.save();
    await generateAndSendOtp(email);

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
