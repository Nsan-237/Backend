const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    name: {
        type:"String",
        required: true 
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
        enum: ["client", "collector", "admin"],
        default: "client"
    },    
    // accountStatus: {
    //     type: "String",
    //     enum: ["active","inactive"],
    //     default: "inactive"
    // }
    
},{timestamps: true});
   

module.exports = mongoose.model('User', userSchema);
