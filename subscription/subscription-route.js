const express = require('express');
const router = express.Router();
const { NewSubscription, GetSubscriptions, UpdateSubscription, DeleteSubscription } = require("./subscription-controller");
const { checkIfUserIsAuthenticated } = require("../middleware/authorizationMiddleware");


// Create a new subscription
router.post('/',checkIfUserIsAuthenticated, NewSubscription);

// Get all subscriptions
router.get('/getSubcriptions', GetSubscriptions);

// Update subscription
router.put('/subscriptions/:subscription_id', UpdateSubscription);

// Delete subscription
router.delete('/subscriptions/:subscription_id', DeleteSubscription);

module.exports = router;