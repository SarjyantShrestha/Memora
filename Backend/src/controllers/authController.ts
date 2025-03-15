import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";
import { generateAndSendOtp } from "../utils/generateAndSendOtp";
import bcrypt from "bcrypt";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} from "../initializers/jwtInitializers";

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.isVerified) {
      res.status(404).json({
        message:
          "User hasn't been verified. Please register again and verify OTP.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("password didn't match");
      res.status(401).json({ message: "Invalid credentials" });
      return;
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
      secure: true,
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      partitioned: true,
    });

    res.status(200).json({ accessToken });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return;
  }
};

//Register user with validation
export const register = async (req: Request, res: Response) => {
  const { name, email, password, confirm_password } = req.body;
  //
  // Check if password and confirm_password match
  if (password !== confirm_password) {
    res.status(400).json({ message: "Passwords do not match." });
    return;
  }

  //Check existing username
  const existingName = await User.findOne({
    where: { name: name.toLowerCase() },
  });
  if (existingName) {
    res.status(400).json({ message: "Username already taken" });
    return;
  }

  try {
    //Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (existingUser.isVerified) {
        // If user exists and is verified, return error for login
        res.status(400).json({
          message: "User already exists. Please proceed with login.",
        });
        return;
      } else {
        // If user exists but not verified, update user details
        existingUser.name = name;
        existingUser.password = await bcrypt.hash(password, 10);

        await existingUser.save();
        await generateAndSendOtp(email);

        res.status(200).json({ message: "User updated successfully!" });
        return;
      }
    }

    //Create and save the new user
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    await user.save();
    await generateAndSendOtp(email);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Refresh Token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh Token required" });
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

//Logout User
export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
