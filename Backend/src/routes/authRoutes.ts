import { Router } from "express";
import { login, register, refreshToken } from "../controllers/authController";
import { loginValidation, registerValidation } from "../utils/validators";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/register", registerValidation, register);
router.post("/refresh", refreshToken);

export default router;
