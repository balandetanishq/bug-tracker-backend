const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  res.json({ message: "BUG ROUTE HIT" });
});

module.exports = router;