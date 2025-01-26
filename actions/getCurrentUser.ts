import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";

export async function getSessions() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSessions();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: { order: true },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.createdAt.toISOString(),
      emailVerified: currentUser.emailVerified
        ? currentUser.emailVerified.toString()
        : null,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
