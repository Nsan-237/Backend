const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    name: {
        type:"String",
        required: true // for validation purposes
    },
    email: {
        type:"String",
        required: true,
        unique: true,
    },
    phone: {
        type:"String",
        required: true,
    },
    password: {
        type:"String",
        required: true,  
        },
    role: {
        type: "String",
        enum: ["client", "collector"],
        default: "client"
    },    
    // accountStatus: {
    //     type: "String",
    //     enum: ["active","inactive"],
    //     default: "inactive"
    // },
<<<<<<< HEAD
    
=======
>>>>>>> d11939f98713ddbc3bfb22ab6e999cff6b6f06b8
},{timestamps: true});
   

module.exports = mongoose.model('User', userSchema);
