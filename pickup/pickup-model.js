const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subscription Schema
const pickupSchema = new Schema({
    date: {
        type: "String",
        required: true
    },
    location: {
        type: "String",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: "String",
        enum: ["collected", "non-collected", "pending"],
        default: "pending"
    }
}, {timestamps: true});
// Create Subscription model
module.exports = mongoose.model('Pickup', pickupSchema);