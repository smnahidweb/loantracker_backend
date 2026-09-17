import { auth } from "./auth";
import { prisma } from "./prisma";

async function main() {
  const adminEmail = "admin@lms.com";
  
  // ১. আগের ইউজার থাকলে ডিলিট করে নতুন করে তৈরি করব (যাতে পাসওয়ারড হ্যাশ ফ্রেশ হয়)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    // অ্যাকাউন্ট টেবিল এবং ইউজার ডিলিট
    await prisma.account.deleteMany({ where: { userId: existingAdmin.id } });
    await prisma.user.delete({ where: { id: existingAdmin.id } });
    console.log("🔄 Previous admin user removed for clean seed.");
  }

  // ২. Better-Auth এর মাধ্যমে নতুন অ্যাডমিন তৈরি
  await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: "AdminPassword123!",
      name: "Super Admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Initial Admin Created Successfully with Password: AdminPassword123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });