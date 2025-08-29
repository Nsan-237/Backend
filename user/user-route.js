const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {signupController,LoginController,ForgetPasswordController,LogoutController} = require("./user-controller");

//Signup route
router.post("/signup", 
    // [
    // check("username","Name must be at least 3 characters long").isLength({min:3}),
    // check("useremail","Please provide a valid email").isEmail(),
    // check("userpassword","Password must be at least 6 characters long").isLength({min:6}),
    // check("userphone","Phone number must be at least 9 characters long").isLength({min:9}),
    // ],
    signupController);

//Login route
router.post("/login", [
     check("useremail","Please provide a valid email").isEmail(),
     check("userpassword","Password must be at least 6 characters long").isLength({min:6}),
],LoginController);

//Logout/Signout route
    router.get("/logout",LogoutController);
//Forget password route
router.post("/forget-password", ForgetPasswordController);
//Export the router
module.exports = router;