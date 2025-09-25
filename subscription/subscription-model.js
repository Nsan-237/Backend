const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subscription Schema
const subscriptionSchema = new Schema({
// Plan name            
name: {
    type: "String",
    required: true
},
     // Current price
price: { 
    type: "String",
    required: true
},
duration: {
    type: "String", // e.g. "1 month"
    required: true
},
userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}],
features: {
    type: [String],
    required: true
},
status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending"
},
    // Original price (optional)
originalprice: { 
    type: "Number",
    required: false 
},
// e.g., "25L"                  
bucketsize: { 
    type: "String", 
    required: true 
}, 
// e.g., "2 times per week"
frequency: { 
    type: "String", 
    required: true 
}, 
  // Most popular badge   
popular: { 
    type: Boolean, 
    default: false 
},  
 subscribedAt: { 
    type: Date, 
    default: Date.now 
    }
}, {timestamps: true});


module.exports = mongoose.model('Subscription', subscriptionSchema);
