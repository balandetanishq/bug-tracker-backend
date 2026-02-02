const express = require("express");
const router = express.Router();
const Bug = require("../models/bug");
const auth = require("../middleware/authMiddleware");

// UPDATE BUG STATUS
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
