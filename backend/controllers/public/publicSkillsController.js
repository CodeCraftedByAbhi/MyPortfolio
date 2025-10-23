const Skill = require("../../model/Skill");

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .select("name icon").sort({craetedAt : -1});

    res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err.message);
    res.status(500).json({ message: err.message });
  }
};
