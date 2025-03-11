import express from "express";
import { sendOtp } from "../controllers/otpController";

const router = express.Router();

// @ts-ignore - Temporarily ignore TypeScript errors
router.post("/send-otp", sendOtp);

export default router;
