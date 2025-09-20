const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assigning Schema
const assigningSchema = new Schema({
    task: {
        type: "String",
        required: true
    },
    cliecntId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collector',
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true});
// Create Assigning model
module.exports = mongoose.model('Assigning', assigningSchema);