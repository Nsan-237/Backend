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
    location:{
        type:"String"
    },
    phone: {
        type:"String"
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
    subscription: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true
        }],
    
},{timestamps: true});
   

module.exports = mongoose.model('User', userSchema);
