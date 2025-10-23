const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: "Present" },
  description: { type: String, default: "" },
  techUsed: { type: [String], default: [] },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
