const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ["Full Stack", "Frontend", "Backend"],
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    projectLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
