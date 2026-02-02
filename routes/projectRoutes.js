const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", authMiddleware, createProject);
router.delete("/:id", deleteProject);

module.exports = router;
