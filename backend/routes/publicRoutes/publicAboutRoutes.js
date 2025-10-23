// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getAbout } = require("../../controllers/public/publicAboutController");

router.get("/",getAbout);
module.exports = router;
