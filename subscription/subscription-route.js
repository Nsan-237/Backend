const express = require('express');
const router = express.Router();
const { NewSubscription, GetSubscriptions, UpdateSubscription, DeleteSubscription } = require("./subscription-controller");
const { checkIfUserIsAuthenticated } = require("../middleware/authorizationMiddleware");


// Create a new subscription
router.post('/',checkIfUserIsAuthenticated, NewSubscription);

// Get all subscriptions
router.get('/getSubscription', GetSubscriptions);

// Update subscription
router.put('/updateSubscription/:subscription_id', UpdateSubscription);

// Delete subscription
router.delete('/deleteSubscription/:subscription_id', DeleteSubscription);

module.exports = router;