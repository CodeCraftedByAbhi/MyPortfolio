// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getExperiences } = require("../../controllers/public/publicExperienceController");

router.get("/", getExperiences);
module.exports = router;
