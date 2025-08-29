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
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
