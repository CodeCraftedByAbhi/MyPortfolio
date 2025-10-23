// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getCourses } = require("../../controllers/public/publicCoursesController");

router.get("/", getCourses);
module.exports = router;
