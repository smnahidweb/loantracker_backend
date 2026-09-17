import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import { Role } from "../../prisma/schema/generated/prisma/browser";


export const authMiddleware = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Session not found or expired.",
        });
      }

      // Role Authorization Logic
      if (roles && roles.length > 0) {
        const userRole = session.user.role as Role;
        if (!roles.includes(userRole)) {
          return res.status(403).json({
            success: false,
            message: "Forbidden. You do not have permission to access this resource.",
          });
        }
      }

      (req as any).user = session.user;
      (req as any).session = session.session;

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Unauthorized access.",
      });
    }
  };
};