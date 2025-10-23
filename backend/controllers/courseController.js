const Course = require("../model/Course");

// Get all courses for this admin
exports.getCourses = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { adminId: req.admin._id };

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, discount } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ message: "Title, description, and price are required" });
    }

    let image = "";
    if (req.file) {
      image = req.file.path; // Cloudinary file path
    }

    const course = new Course({
      title,
      description,
      price,
      discount: discount || 0,
      image,
      adminId: req.admin._id,
    });

    await course.save();
    res.status(201).json({ message: "Course added", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, discount } = req.body;

    const course = await Course.findOne({ _id: id, adminId: req.admin._id });
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.discount = discount !== undefined ? discount : course.discount;
    if (req.file) course.image = req.file.path;

    await course.save();
    res.json({ message: "Course updated", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOneAndDelete({ _id: id, adminId: req.admin._id });
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
