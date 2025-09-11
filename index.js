const express = require('express');
const mongoose= require('mongoose');
const userRoutes = require('./user/user-route');
const subscriptionRoutes = require('./subscription/subscription-route');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost:27017/zerodech",{
});

const conn = mongoose.connection;
//CONNECTION ESTABLISHED
if (conn){
    console.log("Database connection sucessfull");
} 
else{
    console.log("Database connection failed");
}
//Middleware to parse JSON bodies
app.use(express.json());
//Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
//Define our user routes
app.use('/api/user', userRoutes);
//Define our subscription routes
app.use('/api/subscription', subscriptionRoutes);



app.listen(port, () => {
    console.log(`Server is running on:${port}`);
});