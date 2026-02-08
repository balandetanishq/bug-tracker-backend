import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());


/* ================= MODELS ================= */

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  project: {
    type: String,
    default: "General",
  },

  assignedTo: {
    type: String,
    default: "Unassigned",
  },

  status: {
    type: String,
    enum: ["ToDo", "InProgress", "Done"],
    default: "ToDo",
  },

  userId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Bug = mongoose.model("Bug", bugSchema);


/* ================= AUTH ================= */

const auth = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json("No token");
  }

  try {

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json("Invalid token");
  }
};


/* ================= ROUTES ================= */


/* REGISTER */
app.post("/api/auth/register", async (req, res) => {

  const { email, password } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(400).json("User exists");
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash,
  });

  res.json("Registered");
});


/* LOGIN */
app.post("/api/auth/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("User not found");
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).json("Wrong password");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});


/* GET BUGS */
app.get("/api/bugs", auth, async (req, res) => {

  const bugs = await Bug.find({
    userId: req.user.id
  }).sort({ _id: -1 });

  res.json(bugs);
});


/* ADD BUG */
app.post("/api/bugs", auth, async (req, res) => {

  const {
    title,
    description,
    project,
    assignedTo
  } = req.body;

  if (!title || !description) {
    return res.status(400).json("Missing fields");
  }

  const bug = await Bug.create({

    title,
    description,

    project: project || "General",
    assignedTo: assignedTo || "Unassigned",

    status: "ToDo",

    userId: req.user.id,
  });

  res.json(bug);
});


/* DELETE BUG */
app.delete("/api/bugs/:id", auth, async (req, res) => {

  await Bug.findByIdAndDelete(req.params.id);

  res.json("Deleted");
});


/* UPDATE STATUS */
app.put("/api/bugs/:id", auth, async (req, res) => {

  const { status } = req.body;

  if (!["ToDo", "InProgress", "Done"].includes(status)) {
    return res.status(400).json("Invalid status");
  }

  await Bug.findByIdAndUpdate(
    req.params.id,
    { status }
  );

  res.json("Updated");
});


/* ================= START ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});