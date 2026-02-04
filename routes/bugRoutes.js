import express from "express";
import Bug from "../models/Bug.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Bug route working" });
});

// Create bug
router.post("/", auth, async (req, res) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating bug" });
  }
});

// Get all bugs
router.get("/", auth, async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bugs" });
  }
});

export default router;