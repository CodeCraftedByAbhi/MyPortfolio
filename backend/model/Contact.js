const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    message: String,
    read: { type: Boolean, default: false },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
