import { AppDataSource } from "../initializers/data-source";
import { Otp } from "../models/Otp";
import { sendOtpEmail } from "../initializers/emailService"; // Import the email service

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpRepo = AppDataSource.getRepository(Otp);

export const generateAndSendOtp = async (
  email: string,
): Promise<{ message: string }> => {
  const otpCode = generateOtp();
  const expiryDate = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes

  try {
    // Check if user already has an OTP
    let userOtp = await otpRepo.findOne({ where: { email } });

    if (userOtp) {
      const currentTime = new Date();

      // Check if OTP is expired or not
      if (userOtp.expiryDate > currentTime) {
        return {
          message:
            "OTP is still valid. Please wait 2 minutes before requesting a new one.",
        };
      }

      // OTP has expired, so we proceed to generate a new OTP
      userOtp.otpCode = otpCode;
      userOtp.expiryDate = expiryDate;
    } else {
      // If no OTP exists, create a new OTP entry
      userOtp = otpRepo.create({
        email,
        otpCode: otpCode,
        expiryDate: expiryDate,
      });
    }

    // Save OTP to the database and send email
    await otpRepo.save(userOtp);
    await sendOtpEmail(email, otpCode);

    return { message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error generating or sending OTP:", error);
    throw new Error("Error sending OTP");
  }
};
