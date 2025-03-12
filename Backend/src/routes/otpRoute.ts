import express from "express";
import { resendOtp, verifyOtp } from "../controllers/otpController";

const router = express.Router();

router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
