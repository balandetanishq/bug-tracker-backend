import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

/* -------------------- CORS (SIMPLE & SAFE) -------------------- */

app.use(
  cors({
    origin: [
      "https://bug-tracker-frontend-r46k.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

/* Handle preflight */
app.options("*", cors());

/* -------------------------------------------------------------- */

app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);

/* Root test */
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 10000;

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => console.error(err));