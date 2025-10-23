const Blog = require("../../model/Blog");

exports.getBlogs = async (req, res) => {
  try {
    const { search, page = 1, limit = 6 } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .select("title content coverImage tags createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      blogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err.message);
    res.status(500).json({ message: err.message });
  }
};
