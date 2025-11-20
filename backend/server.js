const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const errorHandler = require("./middleware/errorHandling");
const cors = require("cors");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const allowedOrigins = [
  "https://my-portfolio-admin-psi.vercel.app",
  "https://my-portfolio-user-frontend.vercel.app",
  https://abhishek.org.in
];

app.use(cors({
  origin: function(origin, callback) {
  
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Routes
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/public/contact", require("./routes/contactRoutes"));
app.use("/api/admin/contact", require("./routes/contactRoutes"));  

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

