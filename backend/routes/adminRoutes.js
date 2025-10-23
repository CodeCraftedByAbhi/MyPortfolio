const express = require("express");
const { registerAdmin, loginAdmin, getProfile, updateProfile} = require("../controllers/adminController");
const { check, validationResult } = require("express-validator");
const upload = require("../middleware/upload");
const router = express.Router();
const authentication = require("../middleware/authentication")

router.post(
  "/signup",
  upload.single("profilePic"),
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Passwords min should be 6 characters").isLength({
      min: 6,
    }),
    check("contact", "Contact number should be valid")
      .optional()
      .isMobilePhone(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  registerAdmin
);

router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Passwords min should be 6 characters").isLength({
      min: 6,
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  loginAdmin
);

router.get("/profile/:id", authentication, getProfile);

router.put("/profile/:id", authentication, upload.single("profilePic"), updateProfile)

module.exports = router;
