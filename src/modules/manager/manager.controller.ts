import { Request, Response } from "express";
import { managerService } from "./manager.service";

const getPendingStaffs = async (req: Request, res: Response) => {
  try {
    const pendingStaffs = await managerService.getPendingStaffs();
    return res.status(200).json({
      success: true,
      message: "Pending staff list fetched successfully",
      data: pendingStaffs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch pending staff list",
    });
  }
};



const assignManagerRole = async (req: Request, res: Response) => {
  try {
    const { userId, branch, employeeId } = req.body;

    if (!userId || !branch) {
      return res.status(400).json({
        success: false,
        message: "User ID and Branch are required",
      });
    }

    const manager = await managerService.assignManagerRole({
      userId,
      branch,
      employeeId,
    });

    return res.status(200).json({
      success: true,
      message: "Staff promoted to Manager successfully",
      data: manager,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to assign manager role",
    });
  }
};



const getAllManagers = async (req: Request, res: Response) => {
  try {
    const managers = await managerService.getAllManagers();
    return res.status(200).json({
      success: true,
      message: "Manager list fetched successfully",
      data: managers,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch managers",
    });
  }
};

export const managerController = {
  getPendingStaffs,
  assignManagerRole,
  getAllManagers,
};