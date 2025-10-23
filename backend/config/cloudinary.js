const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.C_Name,
  api_key: process.env.C_Key,
  api_secret: process.env.C_Secret,
});

module.exports = cloudinary;
