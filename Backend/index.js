import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.js";
import { taskRoutes } from "./routes/task.js";
import { createUserOnStart } from "./server.js";
import { isLoggedIn } from "./middleswares/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://eizenhower-to-do-board.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.get("/protected", isLoggedIn(), (req, res) => {
    res.send("✅ You are logged in!");
});

// Initialize database, then start server
createUserOnStart()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to initialize DB:", err);
  });
