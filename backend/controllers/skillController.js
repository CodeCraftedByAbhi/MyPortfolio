const Skill = require("../model/Skill");

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ adminId: req.admin._id });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a skill
exports.createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Skill name is required" });

    let icon = "";
    if (req.file) {
      icon = req.file.path; // ✅ Use local variable
    }

    const skill = new Skill({ name, icon, adminId: req.admin._id });
    await skill.save();
    res.status(201).json({ message: "Skill added", skill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const skill = await Skill.findOne({ _id: id, adminId: req.admin._id });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    skill.name = name || skill.name;
    if (req.file) {
      skill.icon = req.file.path;
    }

    await skill.save();
    res.json({ message: "Skill updated", skill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findOneAndDelete({ _id: id, adminId: req.admin._id });

    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
