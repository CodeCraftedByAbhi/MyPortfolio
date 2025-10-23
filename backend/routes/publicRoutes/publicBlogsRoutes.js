// routes/publicRoutes/publicProjectsRoutes.js
const express = require("express");
const router = express.Router();
const { getBlogs } = require("../../controllers/public/publicBlogsController");

router.get("/", getBlogs);
module.exports = router;
