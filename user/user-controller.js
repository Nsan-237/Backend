const userModel = require("./user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = { 
//Signup controller    
signupController:async(req, res)=>{
const {username,useremail,userpassword,userphone,userrole} = req.body;

if(!username || !useremail || !userpassword){
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
    phone: userphone,
    password:hashedPassword,
    role: "client",
    //accountStatus:"active"
});
return res.status(201).json({message:"User created successfully",data:user});
},
//Login controller
LoginController:async(req, res)=>{
const {useremail,userpassword}=req.body;
if(!useremail || !userpassword){
    return res.status(400).json({message:"All fields are required"});
}
const user = await userModel.findOne({email:useremail});
if(!user){
    return res.status(400).json({message:"User not found"});
}
// Compare the password and the hashed password
const isPasswordValid = await bcrypt.compare(userpassword, user.password);
if(!isPasswordValid){
    return res.status(400).json({message:"Invalid password"});
}
const token = jwt.sign({id:user._id},"samuel",{expiresIn:"24h"});

return res.status(200).json({message:"Login successful",user, token});
},
//Forget user password controller
ForgetPasswordController: async (req, res) => {
  try {
    const { useremail, newpassword } = req.body;

    if (!useremail || !newpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: useremail });
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
}
}
