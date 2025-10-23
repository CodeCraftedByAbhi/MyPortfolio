const express = require("express");
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload");

router.get("/", getProjects);
router.post("/", authentication, upload.single("image"), createProject);
router.put("/:id", authentication, upload.single("image"), updateProject);
router.delete("/:id", authentication, deleteProject);   

module.exports = router;
