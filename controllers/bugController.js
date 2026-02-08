import Bug from "../models/Bug.js";

/* Get All Bugs */
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({ userId: req.user.id });
    res.json(bugs);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/* Create Bug */
export const createBug = async (req, res) => {
  try {
    const { title, description, project, assignedTo } = req.body;

    const bug = await Bug.create({
      title,
      description,
      project,
      assignedTo,
      userId: req.user.id,
    });

    res.json(bug);
  } catch (err) {
    res.status(500).json("Add Failed");
  }
};

/* Delete Bug */
export const deleteBug = async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch {
    res.status(500).json("Delete Failed");
  }
};

/* Update Status */
export const updateBug = async (req, res) => {
  try {
    const { status } = req.body;

    await Bug.findByIdAndUpdate(req.params.id, {
      status,
    });

    res.json("Updated");
  } catch {
    res.status(500).json("Update Failed");
  }
};