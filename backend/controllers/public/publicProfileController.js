 const About = require("../../model/About");

 exports.getProfile = async (req, res, next) => {
   try {
     const admin = await Admin.findOne().select("-password")
     if(!admin){
       return res.status(404).json({success:false, message:"User Not Found"})
     }
     res.json(admin)
   } catch (error) {
     next(error)
     
   }
 }