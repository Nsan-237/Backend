const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Feedback Schema
const feedbackSchema = new Schema({
    content: {
        type: "String",
        required: true
    },
    photo:{
        type: "String",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: "String",
        enum: ["collected", "missed"],
        default: "missed"
    }
}, {timestamps: true});
// Create Feedback model
module.exports = mongoose.model('Feedback', feedbackSchema);