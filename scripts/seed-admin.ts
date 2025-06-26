import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME;

  if (!adminEmail || !adminPassword || !adminName) {
    throw new Error("Admin credentials are not set in environment variables.");
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { email: adminEmail, role: "ADMIN" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists:", adminEmail);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
