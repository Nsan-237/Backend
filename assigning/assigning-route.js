const express = require('express');
const router = express.Router();
const { CreateAssigning } = require("./assigning-controller");
const { checkIfUserIsAuthenticated } = require("../middleware/authorizationMiddleware");


// Create assigning
router.post('/create',checkIfUserIsAuthenticated, CreateAssigning);

// // Get all subscriptions
// router.get('',);

// // Update subscription
// router.put('', );

// // Delete subscription
// router.delete('', );

module.exports = router;