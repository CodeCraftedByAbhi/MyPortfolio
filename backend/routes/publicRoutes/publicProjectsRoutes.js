const express = require("express");
const router = express.Router();
const { getProjects } = require("../../controllers/public/publicProjectsController");

router.get("/",getProjects);
module.exports = router;
