import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();


// Custom Auth Routes
router.post("/register-manager", authController.registerManager);
router.post("/login", authController.loginUser);
router.get("/me", authController.getMe);

export const authRoutes = router;