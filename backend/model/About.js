const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String], // List of skills
    default: []
  },
  hobbies: {
    type: [String], // List of hobbies
    default: []
  },
  goal: {
    type: String,
    default: ""
  },
  learning: {
    type: String,
    default: ""
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);
