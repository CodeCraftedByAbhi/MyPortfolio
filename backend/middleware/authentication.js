const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: User Not Found" });
    }

    req.admin = admin;
    req.user = {id: admin._id}
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authentication;
