const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:"String",
        required: true // for validation purposes
    },
    email: {
        type:"String",
        unique: true,
    },
    password: {
        type:"String",
        required: true0,  
        },
    accountStatus: {
        type: "String",
        enum: ["active","inactive"],
        default: "inactive"
    },
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
