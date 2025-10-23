const Blog = require("../model/Blog");

// Get all blogs for this admin
exports.getBlogs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { adminId: req.admin._id };

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    if (!title || !description || !content) {
      return res.status(400).json({ message: "Title, description, and content are required" });
    }

    let image = "";
    if (req.file) {
      image = req.file.path; // Cloudinary path
    }

    const blog = new Blog({ title, description, content, image, adminId: req.admin._id });
    await blog.save();
    res.status(201).json({ message: "Blog added", blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content } = req.body;

    const blog = await Blog.findOne({ _id: id, adminId: req.admin._id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    if (req.file) blog.image = req.file.path;

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOneAndDelete({ _id: id, adminId: req.admin._id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
