const express = require("express");
const router = express.Router();
const { CreateFeedback } = require("./feedback-controller");
const {
  checkIfUserIsAuthenticated,
} = require("../middleware/authorizationMiddleware");

// Create a feedback
router.post("/create", checkIfUserIsAuthenticated, CreateFeedback);

// // Get all subscriptions
// router.get("");

// // Delete subscription
// router.delete("");

module.exports = router;
