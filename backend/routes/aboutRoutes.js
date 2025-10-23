const express = require("express");
const router = express.Router();
const { getAbout, upsertAbout } = require("../controllers/aboutController");
const authentication = require("../middleware/authentication");

router.get("/", authentication, getAbout);
router.post("/", authentication, upsertAbout); // create
router.put("/", authentication, upsertAbout);  // update

module.exports = router;
