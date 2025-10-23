const Experience = require("../model/Experience");

// Get all experiences for admin
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ adminId: req.admin._id }).sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add or update experience (upsert)
exports.upsertExperience = async (req, res) => {
  try {
    const data = { ...req.body, adminId: req.admin._id };

    if (data._id) {
      // Update existing experience
      const exp = await Experience.findOneAndUpdate({ _id: data._id, adminId: req.admin._id }, data, { new: true });
      if (!exp) return res.status(404).json({ message: "Experience not found" });
      return res.json({ message: "Experience updated", experience: exp });
    } else {
      // Create new experience
      const exp = await Experience.create(data);
      res.json({ message: "Experience added", experience: exp });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete experience
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findOneAndDelete({ _id: id, adminId: req.admin._id });
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
