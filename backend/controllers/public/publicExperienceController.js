const Experience = require("../../model/Experience");

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .select("company role startDate endDate description techUsed")
      .sort({ startDate: -1 });

    res.status(200).json(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err.message);
    res.status(500).json({ message: err.message });
  }
};
