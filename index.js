const express = require('express');
const mongoose= require('mongoose');
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

app.listen(port, () => {
    console.log(`Server is running on:${port}`);
});