const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const User = require('./user-model');
const {signupController,LoginController,ForgetPasswordController,LogoutController,GetUser} = require("./user-controller");

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

//Get user route
router.get("/getUser", GetUser);

//Get user route
// backend/routes/user.js
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


//Export the router
module.exports = router;