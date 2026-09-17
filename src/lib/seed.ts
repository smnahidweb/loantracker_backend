
import { auth } from "./auth";
import { prisma } from "./prisma";

async function main() {
  const adminEmail = "admin@lms.com";
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: "AdminPassword123!",
        name: "Super Admin",
        role: "ADMIN",
      },
    });
    console.log("✅ Initial Admin Created Successfully!");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });