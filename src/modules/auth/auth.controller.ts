import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authServices.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to login",
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const user = await authServices.getMe(userId);

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch user profile",
    });
  }
};

// ২. register a manager
const registerManager = async(req: Request, res: Response) => {

    try{

        const { name, email, password, phone, employeeId, branch } = req.body;

        if (!name || !email || !password || !phone || !branch) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password, phone and branch are required",
            });
        }

        const result = await authServices.registerManager({
            name,
            email,
            password,
            phone,
            employeeId,
            branch
        });

        return res.status(201).json({
            success: true,
            message: "Manager registered successfully",
            data: result
        });

    }

    catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to register manager",
          });
    }
}

export const authController = {
  loginUser,
  getMe,
  registerManager,
};