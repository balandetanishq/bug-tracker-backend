const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");

const projectRoutes = require("./routes/projectRoutes");
const bugRoutes = require("./routes/bugRoutes");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Bug Tracker API running");
});

app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
