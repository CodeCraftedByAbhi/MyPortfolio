const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload"); // Cloudinary multer
const { getBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

router.get("/", authentication, getBlogs);
router.post("/", authentication, upload.single("image"), createBlog);
router.put("/:id", authentication, upload.single("image"), updateBlog);
router.delete("/:id", authentication, deleteBlog);

module.exports = router;
