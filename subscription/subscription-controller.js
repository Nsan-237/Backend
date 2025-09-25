const mongoose = require("mongoose");
const Subscription = require("./subscription-model");
const User = require("../user/user-model");

module.exports = {
  // Admin creates a new subscription plan
  NewSubscription: async (req, res) => {
    try {
      const {
        plan,
        status,
        duration,
        price,
        features,
        popular,
        color,
        icon,
        iconColor,
        frequency,
        bucketSize,
      } = req.body;

      const findPlan = await Subscription.findOne({ plan });
      if (findPlan)
        return res.status(400).json({ message: "Plan already exists" });

      const subscription = new Subscription({
        plan,
        status,
        duration,
        price,
        features,
        popular,
        color,
        icon,
        iconColor,
        frequency,
        bucketSize,
      });

      await subscription.save();

      res
        .status(201)
        .json({
          success: true,
          message: "Subscription plan created successfully",
          data: subscription,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error creating subscription",
          error: error.message,
        });
    }
  },

  // Client subscribes to a plan
  SubscribeToPlan: async (req, res) => {
    try {
      console.log("Received subscribe request:", req.body, req.user);
      console.log("BODY:", req.body);
      console.log("USER:", req.user);

      const { subscription_id } = req.body;
      if (!subscription_id) {
        console.log("subscription_id is required");
        return res
          .status(400)
          .json({ success: false, message: "subscription_id is required" });
      }

      const subscription = await Subscription.findById(subscription_id);
      if (!subscription)
        return res
          .status(404)
          .json({ success: false, message: "Plan not found" });

      if (!req.user || !req.user._id) {
        return res
          .status(401)
          .json({ success: false, message: "User not authenticated" });
      }

      if (!subscription.userId.includes(req.user._id))
        subscription.userId.push(req.user._id);
      subscription.status = "active";

      await User.findByIdAndUpdate(req.user._id, {
        $push: { subscription: subscription._id },
      });
      await subscription.save();

      res
        .status(200)
        .json({
          success: true,
          message: "Successfully subscribed!",
          data: subscription,
        });
    } catch (error) {
      console.error("SubscribeToPlan error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Error subscribing",
          error: error.message,
        });
    }
  },

  // Get all subscription plans
  GetSubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

      res
        .status(200)
        .json({
          success: true,
          count: subscriptions.length,
          data: subscriptions,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error retrieving subscriptions",
          error: error.message,
        });
    }
  },

  // Get subscriptions of current client
  GetMySubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.find({
        userId: req.user._id,
      }).populate("userId");

      res
        .status(200)
        .json({
          success: true,
          count: subscriptions.length,
          data: subscriptions,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error retrieving client subscriptions",
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
        { _id: subscription_id },
        updates,
        { new: true, runValidators: true }
      );

      if (!subscription)
        return res
          .status(404)
          .json({ success: false, message: "Subscription not found" });

      res
        .status(200)
        .json({
          success: true,
          message: "Subscription updated successfully",
          data: subscription,
        });
    } catch (error) {
      res
        .status(500)
        .json({
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
        _id: subscription_id,
      });
      if (!subscription)
        return res
          .status(404)
          .json({ success: false, message: "Subscription not found" });

      res
        .status(200)
        .json({ success: true, message: "Subscription deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error deleting subscription",
          error: error.message,
        });
    }
  },
};
