import { Request, Response } from "express";
import { Otp } from "../models/Otp";
import { User } from "../models/User";
import { generateAndSendOtp } from "../utils/generateAndSendOtp";
import { validateEmail } from "../utils/validators";
import { AppDataSource } from "../initializers/data-source";

const otpRepo = AppDataSource.getRepository(Otp);

// Resend OTP function
export const resendOtp = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  // Check if the email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and send OTP (will either update or create a new OTP)

    const response = await generateAndSendOtp(email);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).json({ message: "Error resending OTP" });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { email, otp } = req.body;

  try {
    // Check if OTP is provided
    if (!otp) {
      return res.status(400).json({ message: "OTP not provided" });
    }

    // Retrieve the OTP for the given email
    const userOtp = await otpRepo.findOne({ where: { email } });

    // Check if user OTP exists
    if (!userOtp) {
      return res.status(404).json({ message: "OTP not found for this email" });
    }

    const currentTime = new Date();

    // Check if OTP is expired
    if (userOtp.expiryDate < currentTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Check if OTP matches
    if (otp.toString() !== userOtp.otpCode) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid, update user verification status
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
