import express from "express";
import Project from "../models/project.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* CREATE PROJECT */
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
});

/* GET ALL PROJECTS */
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

export default router;