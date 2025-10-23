const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { getExperiences, upsertExperience, deleteExperience } = require("../controllers/experienceController");

router.get("/", authentication, getExperiences);
router.post("/", authentication, upsertExperience); // add new experience
router.put("/", authentication, upsertExperience);  // update existing experience
router.delete("/:id", authentication, deleteExperience); // delete

module.exports = router;
