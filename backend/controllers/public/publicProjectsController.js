const Project = require("../../model/Project");

exports.getProjects = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).json({ message: err.message });
  }
};
