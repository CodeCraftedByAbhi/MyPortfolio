const About = require("../model/About");

// Get About data
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne({ adminId: req.user.id });
    if (!about) return res.status(404).json({ message: "No about info found" });

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update About info
exports.upsertAbout = async (req, res) => {
  try {
    const data = { ...req.body, adminId: req.user.id };

    const about = await About.findOneAndUpdate(
      { adminId: req.user.id },
      data,
      { new: true, upsert: true }
    );

    res.json({ message: "About section updated", about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

