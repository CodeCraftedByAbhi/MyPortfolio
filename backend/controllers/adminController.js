const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, contact } = req.body;
    const profilePic = req.file?.path;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false,message: "User already exist...!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      contact,
      profilePic,
    });
    await admin.save();

    res
      .status(201)
      .json({success: true, message: "Admin Registration successfull...!!!", admin });
  } catch (error) {
    next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false,message: "Invalid Email" });

    const matchedPassword = await bcrypt.compare(password, admin.password);
    if (!matchedPassword) return res.status(400).json({success: false, message: "Invalid Password"});

    const token = jwt.sign({id: admin._id}, process.env.JWT_Secret, {expiresIn: "1d"})

    res.status(201).json({ success: true,message:"Login successful", admin , token })

  } catch (error) {
        next(error)
  }
};


exports.getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password")
    if(!admin){
      return res.status(404).json({success:false, message:"User Not Found"})
    }
    res.json(admin)
  } catch (error) {
    next(error)
  }
}

exports.updateProfile =  async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id)
    if(!admin){
      return res.status(404).json({success:false, message:"User Not Found"})
    }

    const {name , email, contact, password} = req.body

    if(name) admin.name = name;
    if(email) admin.email = email;
    if(contact) admin.contact = contact;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    if(req.file){
  admin.profilePic = req.file.path; 
}

    await admin.save();
    const adminDate = admin.toObject()
    delete adminDate.password

    res.json(adminDate)

    }
   catch (error) {
    next(error)
  }
}