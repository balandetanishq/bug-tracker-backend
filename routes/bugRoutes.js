import express from "express";
import {
  getBugs,
  createBug,
  updateBugStatus
} from "../controllers/bugController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getBugs);
router.post("/", auth, createBug);
router.put("/:id/status", auth, updateBugStatus);

export default router;