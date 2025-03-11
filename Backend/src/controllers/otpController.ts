import { Request, Response } from "express";
import { sendOtpEmail } from "../initializers/emailService"; // Import the email service
import { AppDataSource } from "../initializers/data-source";
import { Otp } from "../models/Otp";

const otpRepo = AppDataSource.getRepository(Otp);

// Function to generate a random 6-digit OTP
const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body; // Get email from request body

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otpCode = generateOtp();
  const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  try {
    // Check if user already has an OTP
    let userOtp = await otpRepo.findOne({ where: { userEmail: email } });

    if (userOtp) {
      // Update existing OTP
      userOtp.otpCode = otpCode;
      userOtp.expiryDate = expiryDate;
    } else {
      // Create a new OTP entry
      userOtp = otpRepo.create({ userEmail: email, otpCode, expiryDate });
    }

    // Save OTP to database
    await otpRepo.save(userOtp);

    // Send OTP via email
    await sendOtpEmail(email, otpCode);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};
