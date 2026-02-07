import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugRoutes.js";

dotenv.config();

const app = express();

/* ===========================
   MIDDLEWARE
=========================== */
app.use(express.json());

app.use(cors({
  origin: [
    "https://bugtracker-wheat.vercel.app",
    "https://bugtracker-wheat.vercel.app/",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight
app.options("*", cors())

/* ===========================
   TEST ROUTE
=========================== */
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

/* ===========================
   ROUTES
=========================== */
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

/* ===========================
   SERVER
=========================== */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});