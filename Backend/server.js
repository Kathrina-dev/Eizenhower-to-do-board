import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { userRoutes } from "./routes/user.js";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5174", "https://eizenhower-to-do-board.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

async function createUserOnStart() {
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
}

// create the user, then start the server
createUserOnStart()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error creating user:", err);
  });
