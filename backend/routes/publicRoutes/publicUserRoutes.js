// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getProfile } = require("../../controllers/public/publicProfileController");

router.get("/", getProfile);
module.exports = router;
