// routes/publicRoutes/index.js
const express = require("express");
const router = express.Router();

router.use("/about", require("./publicAboutRoutes"));
router.use("/experience", require("./publicExperienceRoutes"));
router.use("/projects", require("./publicProjectsRoutes"));
router.use("/skills", require("./publicSkillsRoutes"));
router.use("/courses", require("./publicCoursesRoutes"));
router.use("/blogs", require("./publicBlogsRoutes"));
router.use("/profile", require("./publicUserRoutes"));

module.exports = router;
