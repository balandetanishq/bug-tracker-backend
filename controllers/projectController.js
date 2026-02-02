const Project = require("../models/project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects); // ARRAY ONLY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE project
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await Project.create({ name });
    res.status(201).json(project); // SINGLE OBJECT ONLY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
