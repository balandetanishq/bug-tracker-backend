import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  project: {
    type: String,
    default: "General",
  },

  assignedTo: {
    type: String,
    default: "Unassigned",
  },

  status: {
    type: String,
    default: "ToDo",
    enum: ["ToDo", "InProgress", "Done"],
  },

  userId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Bug", bugSchema);