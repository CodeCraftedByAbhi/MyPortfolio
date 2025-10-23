const Project = require("../model/Project");
const cloudinary = require("cloudinary").v2;

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio_projects",
      });
      imageUrl = result.secure_url;
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies ? JSON.parse(req.body.technologies) : [],
      type: req.body.type,
      imageUrl,
      projectLink: req.body.projectLink,
    });

    const saved = await project.save();
    res.status(201).json({ message: "Project created successfully", project: saved });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio_projects",
      });
      updateData.imageUrl = result.secure_url;
    }

    if (updateData.technologies && typeof updateData.technologies === "string") {
      updateData.technologies = JSON.parse(updateData.technologies);
    }

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Project updated", project: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
