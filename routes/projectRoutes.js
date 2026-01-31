const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", auth, createProject);
router.delete("/:id", deleteProject);

module.exports = router;
