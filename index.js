const express = require('express');
const mongoose= require('mongoose');
const userRoutes = require('./user/user-route');
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost:27017/interns",{
});

const conn = mongoose.connection;
//cONNECTION ESTABLISHED
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



app.listen(port, () => {
    console.log(`Server is running on:${port}`);
});