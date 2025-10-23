const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { contactMe, getAllMessages, deleteMessage, markAsRead } = require("../controllers/contactController");

// Public route for user-side contact form
router.post("/", contactMe);

// Admin routes (protected)
router.get("/admin", authentication, getAllMessages);
router.delete("/:id", authentication, deleteMessage);
router.put("/:id", authentication, markAsRead);


module.exports = router;
