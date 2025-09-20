const mongoose = require("mongoose");
const Subscription = require("./assigning-model");
const Assigning = require("./assigning-model");

// Assigning Controller
module.exports = {
    // Create a new assigning
    CreateAssigning: async (req, res) => {
        try {
            const { task, userId, assignedTo, collectorId, assignedBy } = req.body;
            const assigning = new Assigning({
                task,
                clientId: userId,
                assignedTo,
                collectorId: userId,
                assignedBy,
            });
            await assigning.save();
            res.status(201).json({
                success: true,
                message: "Assigning created successfully",
                data: assigning,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
};