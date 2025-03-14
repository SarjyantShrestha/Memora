import express from "express";
import { resendOtp, verifyOtp } from "../controllers/otpController";
import {
  otpValidation,
  emailValidation,
} from "../utils/validators/otpValidators";

const router = express.Router();

router.post("/resend-otp", emailValidation, resendOtp);
router.post("/verify-otp", otpValidation, verifyOtp);

export default router;

/**
 * @swagger
 * tags:
 *   - OTP
 * /api/v1/otp/resend-otp:
 *   post:
 *     summary: Resend OTP to the user's email
 *     description: Generates and sends a new OTP to the user's email address if the user exists.
 *     tags:
 *       - Otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user to resend the OTP
 *                 example: "sarjyant@gmail.com"
 *     responses:
 *       200:
 *         description: OTP successfully resent to the user's email
 *       400:
 *         description: Invalid request (e.g., missing email)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/otp/verify-otp:
 *   post:
 *     summary: Verify the OTP sent to the user's email
 *     description: Verifies the OTP sent to the user's email for the user registration or other purposes.
 *     tags:
 *       - Otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user for OTP verification
 *                 example: "sarjyant@gmail.com"
 *               otp:
 *                 type: string
 *                 description: The OTP to verify
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP or OTP expired
 *       404:
 *         description: OTP not found for the provided email or user not found
 *       500:
 *         description: Internal server error
 */
