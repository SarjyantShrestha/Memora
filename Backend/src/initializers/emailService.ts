import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP email
const sendOtpEmail = async (email: string, otp: string): Promise<string> => {
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: "Memora: Your OTP Code", // Email subject
    text: `Your OTP code is: ${otp}`, // Email body content
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return otp; // Return OTP to be saved or checked against
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

export { sendOtpEmail };
