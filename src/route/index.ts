import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { managerRoutes } from "../modules/manager/manager.router";

const router = Router();

router.use("/auth",authRoutes);
router.use("/admin", managerRoutes);


export const indexRoutes = router;