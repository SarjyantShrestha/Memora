import { Request, Response } from "express";
import { Otp } from "../models/Otp";
import { User } from "../models/User";
import { generateAndSendOtp } from "../utils/generateAndSendOtp";
import { AppDataSource } from "../initializers/data-source";

const otpRepo = AppDataSource.getRepository(Otp);

// Resend OTP route with validation
export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate and send OTP (will either update or create a new OTP)

    const response = await generateAndSendOtp(email);

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Error resending OTP" });
    return;
  }
};

//Verify OTP route with validation
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP is provided
    if (!otp) {
      res.status(400).json({ message: "OTP not provided" });
      return;
    }

    // Retrieve the OTP for the given email
    const userOtp = await otpRepo.findOne({ where: { email } });

    // Check if user OTP exists
    if (!userOtp) {
      res.status(404).json({ message: "OTP not found for this email" });
      return;
    }

    const currentTime = new Date();

    // Check if OTP is expired
    if (userOtp.expiryDate < currentTime) {
      res.status(400).json({ message: "OTP has expired" });
      return;
    }

    // Check if OTP matches
    if (otp.toString() !== userOtp.otpCode) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    // OTP is valid, update user verification status
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
