import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";

dotenv.config();

const app = express();   // ✅ Create app FIRST
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Then use middleware/routes
app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});