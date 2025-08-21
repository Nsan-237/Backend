const express = require('express');
const router = express.Router();
const {signupController,LoginController,ForgetPasswordController} = require("./user-controller");

//Signup route
router.post("/signup", signupController);

//Login route
router.post("/login", LoginController);

//Forget password route
router.post("/forget-password", ForgetPasswordController);
module.exports = router;