const userModel = require("./user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");
module.exports = { 
//Signup controller    
signupController:async(req, res)=>{
const {username,useremail,userlocation,userpassword,userphone,userrole} = req.body;

if(!username || !useremail || !userpassword, !userrole){
    return res.status(400).json({message:"All fields are required"});
}

const userExist = await userModel.findOne({email:useremail})

if(userExist){
    return res.status(400).json({message:"User already exist"});
}
const hashedPassword = await bcrypt.hash(userpassword, 10);
const user = await userModel.create({
    name:username,
    email:useremail,
    location: userlocation,
    phone: userphone,
    password:hashedPassword,
    role: userrole,
    //accountStatus:"active"
});
  return res.status(201).json({message:"User created successfully",data:user});
},
//Login/Signin controller
LoginController:async(req, res)=>{
  try{
const {email,password}=req.body;
const user = await userModel.findOne({email:email});

console.log("user login req:",req.body);


if(!user){
    return res.status(400).json({message:"Invalid credentials"});
}
// Compare the password and the hashed password
const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
    return res.status(400).json({message:"Invalid credentials"});
}
const token = jwt.sign({user}, process.env.SECRET,{expiresIn:"24h"});

return res.status(200).json({message:"Login successful",user, token});}
catch(error){
    return res.status(500).json({message:"Server error", error: error.message});  
}
},

//Logout/Signout controller
  LogoutController: async (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "Signout success"
    });
  },

//Forget user password controller
ForgetPasswordController: async (req, res) => {
  try {
    const { useremail, newpassword } = req.body;

    if (!useremail || !newpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update password in DB
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
},
GetUser: async (req, res) => {

    try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
     
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}
