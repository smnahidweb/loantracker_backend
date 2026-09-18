
import { Role, UserStatus } from "../../../prisma/schema/generated/prisma/browser";
import { prisma } from "../../lib/prisma";

interface IAssignManagerPayload {
  role: string;
  branch: string;

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
const assignManagerRole = async (userId: string, payload: IAssignManagerPayload) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("ইউজার পাওয়া যায়নি");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      role: payload.role, // "MANAGER"
      branch: payload.branch,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      branch: true,
      createdAt: true,
    },
  });

  return updatedUser;
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

// demoteManager 

const demoteManager = async (userId:string)=>{

  const isExistManager = await prisma.user.findUnique({
     where:{
      id:userId
     }
  })

  if(!isExistManager){
    throw new Error("ম্যানেজার পাওয়া যায়নি")
  }


  const result = await prisma.user.update({
    where:{
      id: userId
    },
    data:{
      role:"USER",
      branch:null
    }
  })

  return result

}


export const managerService = {
  getPendingStaffs,
  assignManagerRole,
  getAllManagers,
  demoteManager
};