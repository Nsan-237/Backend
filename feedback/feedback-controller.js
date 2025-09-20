const mongoose = require('mongoose');
const Feedback = require('./feedback-model');
const Schema = mongoose.Schema;
// Feedback Schema
module.exports = {
    CreateFeedback: async (req, res) => {
        try {
            const { content, photo, userId, status } = req.body;
            const feedback = new Feedback({
                content,
                photo,
                userId,
                status
            });
            await feedback.save();
            res.status(201).json({
                success: true,
                message: "Feedback created successfully",
                data: feedback,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}