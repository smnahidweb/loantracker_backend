import { Role, UserStatus } from "../../../prisma/schema/generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface ILoginUserPayload {
  email: string;
  password: string;
}

interface IRegisterManagerPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  employeeId?: string;
  branch: string;
}

const registerManager = async(payload: IRegisterManagerPayload) => {


const { name, email, password, phone, employeeId, branch } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      phone,
      employeeId,
      branch,
      role: Role.USER,
      
    }
  });

  return data;
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data?.user) {
    throw new Error("Invalid credentials");
  }


  if (data.user.status === UserStatus.INACTIVE || data.user.status === UserStatus.SUSPENDED) {
    throw new Error("Your account is currently inactive or suspended. Please contact admin.");
  }

  return data;
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      employeeId: true,
      branch: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User profile not found");
  }

  return user;
};


export const authServices = {
  loginUser,
  getMe,
  registerManager,
}