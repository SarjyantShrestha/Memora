import { Router } from "express";
import { login, register, refreshToken } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/register", register);

export default router;
