
import { Role, UserStatus } from "../../../prisma/schema/generated/prisma/browser";
import { prisma } from "../../lib/prisma";

interface IAssignManagerPayload {
  userId: string;
  branch: string;
  employeeId?: string;
}

// pending staff list
const getPendingStaffs = async () => {
  return await prisma.user.findMany({
    where: {
      role: Role.USER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// ২.update a staff user to manager role
const assignManagerRole = async (payload: IAssignManagerPayload) => {
  const { userId, branch, employeeId } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error("Staff user not found");
  }

  const updatedManager = await prisma.user.update({
    where: { id: userId },
    data: {
      role: Role.MANAGER,
      status: UserStatus.ACTIVE,
      branch,
      ...(employeeId && { employeeId }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      branch: true,
      employeeId: true,
      updatedAt: true,
    },
  });

  return updatedManager;
};

// ৩. get all managers
const getAllManagers = async () => {
  return await prisma.user.findMany({
    where: {
      role: Role.MANAGER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      employeeId: true,
      branch: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const managerService = {
  getPendingStaffs,
  assignManagerRole,
  getAllManagers,
};