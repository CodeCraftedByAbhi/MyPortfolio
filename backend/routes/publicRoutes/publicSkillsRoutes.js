// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getSkills } = require("../../controllers/public/publicSkillsController");

router.get("/", getSkills);
module.exports = router;
