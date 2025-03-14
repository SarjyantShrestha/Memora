import express from "express";
import { resendOtp, verifyOtp } from "../controllers/otpController";
import { otpValidation, emailValidation } from "../utils/validators";

const router = express.Router();

router.post("/resend-otp", emailValidation, resendOtp);
router.post("/verify-otp", otpValidation, verifyOtp);

export default router;
