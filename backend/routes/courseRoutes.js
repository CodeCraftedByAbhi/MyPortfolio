const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload"); // Cloudinary multer

const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

router.get("/", authentication, getCourses);
router.post("/", authentication, upload.single("image"), createCourse);
router.put("/:id", authentication, upload.single("image"), updateCourse);
router.delete("/:id", authentication, deleteCourse);

module.exports = router;
