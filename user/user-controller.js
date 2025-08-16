const userModel = require("./user-model");
module.exports = { 
    signupController:async(req, res)=>{
const {username,useremail,userpassword} = req.body;

if(!username || !useremail || !userpassword){
    return res.status(400).json({message:"All fields are required"});
}
const userExist = await userModel.findOne({email})

if(userExist){
    return res.status(400).json({message:"User already exist"});
}

const user = await userModel.create({
    name:username,
    email:useremail,
    password:userpassword
});
return res.status(201).json({message:"User created successfully",user});
}
}