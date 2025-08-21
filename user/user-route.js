const express = require('express');
const router = express.Router();
const {signupController} = require("./user-controller");


router.post("/signup", signupController);
module.exports = router;