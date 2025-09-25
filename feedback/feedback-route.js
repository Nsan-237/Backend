const express = require("express");
const router = express.Router();
const { CreateFeedback } = require("./feedback-controller");
const {
  checkIfUserIsAuthenticated,
} = require("../middleware/authorizationMiddleware");

// Create a feedback
router.post("/create", checkIfUserIsAuthenticated, CreateFeedback);

module.exports = router;
