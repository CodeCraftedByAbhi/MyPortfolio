const About = require("../../model/About");

exports.getAbout = async (req, res, next) => {
  try {
    const about = await About.find().select(
      "title subtitle description technologies hobbies goal learning"
    );

    if (!about)
      return res
        .status(404)
        .json({ success: false, message: "No About info found" });

    res.status(200).json(about);
  } catch (error) {
    next(error);
  }
};
