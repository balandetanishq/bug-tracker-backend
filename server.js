import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ================= MODELS =================

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,

  project: String,
  assignedTo: String,

  status: {
    type: String,
    enum: ["ToDo", "InProgress", "Done"],
    default: "ToDo",
  },

  userId: String,
});

const User = mongoose.model("User", userSchema);
const Bug = mongoose.model("Bug", bugSchema);

// ================= AUTH =================

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

// ================= ROUTES =================

// Register
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json("User exists");

  const hash = await bcrypt.hash(password, 10);

  await User.create({ email, password: hash });

  res.json("Registered");
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

// Get bugs
app.get("/api/bugs", auth, async (req, res) => {
  const bugs = await Bug.find({ userId: req.user.id });
  res.json(bugs);
});

// Add bug
app.post("/api/bugs", auth, async (req, res) => {
  const { title, description, project, assignedTo, status } = req.body;

  const bug = await Bug.create({
    title,
    description,
    project,
    assignedTo,
    status: status || "ToDo",
    userId: req.user.id,
  });

  res.json(bug);
});

// Delete bug
app.delete("/api/bugs/:id", auth, async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// Update status
app.put("/api/bugs/:id", auth, async (req, res) => {
  const { status } = req.body;

  await Bug.findByIdAndUpdate(req.params.id, {
    status,
  });

  res.json("Updated");
});

// ================= START =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});