import express from "express";
import Bug from "../models/Bug.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* TEST */
router.get("/test", (req, res) => {
  res.json({ message: "Bug route working" });
});

/* CREATE BUG */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const bug = await Bug.create({
      title,
      description,
      priority: priority || "Medium",
      createdBy: req.user.id,
    });

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Failed to create bug" });
  }
});

/* GET ALL BUGS */
router.get("/", auth, async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* UPDATE STATUS / ASSIGN */
router.put("/:id", auth, async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo },
      { new: true }
    );

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.patch("/:id/priority", auth, async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { priority: req.body.priority },
      { new: true }
    );

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Failed to update priority" });
  }
});

/* DELETE */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;