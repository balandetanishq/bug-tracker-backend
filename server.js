import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugRoutes.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: "*", // allow all (safe for demo/project)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================
   DEBUG ENV (IMPORTANT)
========================= */
console.log("MONGO_URI =", process.env.MONGO_URI ? "FOUND ✅" : "NOT FOUND ❌");
console.log("JWT_SECRET =", process.env.JWT_SECRET ? "FOUND ✅" : "NOT FOUND ❌");

/* =========================
   MONGODB CONNECT
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌", err);
  });

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Bug Tracker Backend Running 🚀");
});

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});