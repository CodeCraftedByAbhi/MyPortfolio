const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const upload = require('../middleware/upload');
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillController");

router.get("/", authentication, getSkills);
router.post("/", authentication, upload.single("icon"), createSkill);
router.put("/:id", authentication, upload.single("icon"), updateSkill);
router.delete("/:id", authentication, deleteSkill);

module.exports = router;
