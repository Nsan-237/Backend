const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subscription Schema
const subscriptionSchema = new Schema({
    plan: {
        type: "String",
        required: true
    },
    price: {
        type: "String",
        required: true
    },
    duration: {
        type: "String", // duration in days
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    status: {
        type: "String",
        enum: ["active", "inactive", "pending"],
        default: "pending"
    }
}, {timestamps: true});
// Create Subscription model
module.exports = mongoose.model('Subscription', subscriptionSchema);