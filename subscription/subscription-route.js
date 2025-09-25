const express = require("express");
const router = express.Router();
const { 
  NewSubscription, 
  SubscribeToPlan, 
  GetSubscriptions, 
  GetMySubscriptions, 
  UpdateSubscription, 
  DeleteSubscription 
} = require("./subscription-controller");
const { checkIfUserIsAuthenticated } = require("../middleware/authorizationMiddleware");

// Admin creates a new plan
router.post("/newSubscription", checkIfUserIsAuthenticated, NewSubscription);

// Client subscribes to a plan
router.post("/subscribeToPlan",checkIfUserIsAuthenticated, SubscribeToPlan);

// Get all plans
router.get("/getSubscriptions", GetSubscriptions);

// Get my subscriptions (client)
router.get("/mySubscriptions",  GetMySubscriptions);

// Update plan
router.put("/updateSubscription/:subscription_id", UpdateSubscription);

// Delete plan
router.delete("/deleteSubscription/:subscription_id",  DeleteSubscription);

module.exports = router;
