import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../../prisma/schema/generated/prisma/client";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
  emailAndPassword: { 
    enabled: true, 
  }, 

  user:{
    additionalFields:{
        role:{
            type:"string",
            required:true,
            defaultValue:Role.ADMIN
        },
        status: {
        type: "string",
        defaultValue: "ACTIVE",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      employeeId: {
        type: "string",
        required: false,
      },
      branch: {
        type: "string",
        required: false,
      },
      nid: {
        type: "string",
        required: false,
        defaultValue: null,
    },
    education: {
        type: "string",
        required: false,
        defaultValue: null,

    },
    address: {
        type: "string",
        required: false,
        defaultValue: null,
    },
    designation: {
        type: "string",
        required: false,
        defaultValue: null,
    },
    joiningDate: {
        type: "date",
        required: false,
        defaultValue: null,
    },
  },
  },
});