import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveUserFromGoogle(profile: any) {
  if (!profile?.email) return null;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (existingUser) {
      // Optionally update name if it changed
      if (existingUser.name !== profile.name) {
        await prisma.user.update({
          where: { email: profile.email },
          data: { name: profile.name },
        });
      }
      return existingUser;
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name || "",
        phone_number: "", // optional field
        created_at: new Date(),
      },
    });

    return newUser;
  } catch (err) {
    console.error("Error saving Google user:", err);
    return null;
  }
}
