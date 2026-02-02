const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const {PORT} = require("./config/config");

const projectRoutes = require("./routes/projectRoutes");
const bugRoutes = require("./routes/bugRoutes");
const authRoutes = require("./routes/auth");

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

app.get("/", (req, res) => {
  res.send("Bug Tracker API running");
});

// Server

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
