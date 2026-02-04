const Bug = require("../models/Bug");

// GET all bugs
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate("project", "name");
    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE bug
exports.createBug = async (req, res) => {
  try {
    const { title, project } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        message: "Title and project are required",
      });
    }

    const bug = await Bug.create({ title, project });
    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
