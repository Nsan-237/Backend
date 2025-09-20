const express = require('express');
const router = express.Router();
const { } = require("./pickup-controller");
const { checkIfUserIsAuthenticated } = require("../middleware/authorizationMiddleware");


// Create a new subscription
router.post('',);

// Get all subscriptions
router.get('',);

// Update subscription
router.put('', );

// Delete subscription
router.delete('', );

module.exports = router;