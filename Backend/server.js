// server.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserOnStart() {
  try {
    const count = await prisma.user.count({
      where: { username: { startsWith: "JohnDoe" } },
    });

    const newUsername = `JohnDoe${count + 1}`;

    const user = await prisma.user.create({
      data: {
        username: newUsername,
        password: "securepassword123",
        tasks: {
          create: [
            {
              task: "Complete this project",
              isImportant: false,
              isUrgent: false,
            },
          ],
        },
      },
    });

    console.log("✅ New User Created:", user);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    throw err;
  }
}

export default prisma;
