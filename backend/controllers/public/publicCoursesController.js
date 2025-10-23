const Course = require("../../model/Course");

exports.getCourses = async (req, res) => {
  try {
    const { search, minPrice, maxPrice } = req.query;
    const filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (minPrice || maxPrice)
      filter.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };

    const courses = await Course.find(filter)
      .select("title description image price discount category duration")
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err.message);
    res.status(500).json({ message: err.message });
  }
};
