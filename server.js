const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const {PORT} = require("./config/config");

const projectRoutes = require("./routes/projectRoutes");
const bugRoutes = require("./routes/bugRoutes");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT ||5000;

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bugs", require("./routes/bugRoutes"));

app.get("/", (req, res) => {
  res.send("Bug Tracker API running");
});

// Server

app.listen(PORT, () => {
  console.log("Server running on port $ {PORT}");
});
