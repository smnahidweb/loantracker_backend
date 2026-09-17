import { Router } from "express";
import { managerController } from "./manager.controller";

const router = Router();

// Pending Staffs List Route
router.get("/pending-staffs", managerController.getPendingStaffs);

// Assign Manager Role Route
router.patch("/assign-manager", managerController.assignManagerRole);

// Get All Active Managers Route
router.get("/managers", managerController.getAllManagers);

export const managerRoutes = router;