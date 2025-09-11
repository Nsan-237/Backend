const mongoose = require("mongoose");
const Subscription = require("./subscription-model");

// Subscription Controller
module.exports = {
  // Create a new subscription
  NewSubscription: async (req, res) => {
    try {
      const { plan, status, duration, price, features } = req.body;
      const findplan = await Subscription.findOne({ plan: plan });
      if (findplan) {
        return res.status(400).json({
          message: "Plan already exist",
        });
      }

      // Create new subscription
      const subscription = new Subscription({
        plan,
        status,
        duration,
        price,
        features,
        userId: req.user._id,
      });

      await subscription.save();

      res.status(201).json({
        success: true,
        message: "Subscription created successfully",
        data: subscription,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Error creating subscription",
        error: error.message,
      });
    }
  },

  // Get all subscriptions
GetSubscriptions: async (req, res) => {
        try {
            const subscriptions = await Subscription.find()
                .populate('userId', 'name email')
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                count: subscriptions.length,
                data: subscriptions,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error retrieving subscriptions",
                error: error.message,
            });
        }
    },

  // Update subscription
  UpdateSubscription: async (req, res) => {
    try {
      const { subscription_id } = req.params;
      const updates = req.body;

      const subscription = await Subscription.findOneAndUpdate(
        { subscription_id },
        updates,
        { new: true, runValidators: true }
      );

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Subscription updated successfully",
        data: subscription,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating subscription",
        error: error.message,
      });
    }
  },

  // Delete subscription
  DeleteSubscription: async (req, res) => {
    try {
      const { subscription_id } = req.params;

      const subscription = await Subscription.findOneAndDelete({
        subscription_id,
      });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Subscription deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting subscription",
        error: error.message,
      });
    }
  },
};
