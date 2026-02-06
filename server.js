import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

/* ====== CORS FIX (NO MORE BLOCKING) ====== */

app.use(
  cors({
    origin: [
      "https://bug-tracker-frontend-r46k.onrender.com",
      "http://localhost:3000"
    ],
    credentials: true
  })
);

/* ====== MIDDLEWARE ====== */

app.use(express.json());

/* ====== ROUTES ====== */

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);

/* ====== SERVER ====== */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));