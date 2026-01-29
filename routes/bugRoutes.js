const express = require("express");
const router = express.Router();

const {
  getBugs,
  createBug,
} = require("../controllers/bugController");

// GET all bugs
router.get("/", getBugs);

// CREATE bug
router.post("/", createBug);

module.exports = router;
