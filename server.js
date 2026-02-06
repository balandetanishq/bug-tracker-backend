import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

/* ===============================
   MANUAL CORS MIDDLEWARE
================================ */
app.use(cors({
  origin: [
    "https://bug-tracker-frontend-r46k.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend alive");
});

const PORT = process.env.PORT || 10000;

/* DB + SERVER */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  })
  .catch((err) => console.error(err));