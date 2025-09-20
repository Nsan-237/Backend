const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./user/user-route");
const subscriptionRoutes = require("./subscription/subscription-route");
const feedbackRoutes = require("./feedback/feedback-route");
const assigningRoutes = require("./assigning/assigning-route");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./user/user-model");
dotenv.config();

const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost:27017/zerodech", {});

const conn = mongoose.connection;
//CONNECTION ESTABLISHED
if (conn) {
  console.log("Database connection sucessfull");
} else {
  console.log("Database connection failed");
}

createAdmin();

app.get("/", (req, res) => {
  res.send(
    '<center><h1 style="background-color:blue; color:white;">Welcome to ZeroDech API</h1></center>'
  );
});
//Middleware to parse JSON bodies
app.use(express.json());
//Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
//Define our user routes
app.use("/api/user", userRoutes);
//Define our subscription routes
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use("/api/assigning", assigningRoutes);
// GET /api/subscription/getSubscriptions
app.get("/api/subscription/getSubscriptions", async (req, res) => {
  try {
    // 1️⃣ Fetch plans from database or define them
    let plans = await Subscription.find(); // or your array of plans

    // 2️⃣ Sort plans by your desired order: Basic → Standard → Premium
    const planOrder = ["basic", "standard", "premium"];
    plans.sort((a, b) => planOrder.indexOf(a.id) - planOrder.indexOf(b.id));

    // 3️⃣ Send sorted plans to frontend
    res.json({ success: true, data: plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on:${port}`);
});
async function createAdmin() {
  try {
    const adminExist = await mongoose
      .model("User")
      .findOne({ email: "samuel@example.com" });

    if (!adminExist) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      const adminUser = new User({
        name: "samuel",
        email: "samuel@example.com",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log(
        "Admin user created with username 'samuel' and 'password '123456'"
      );
      console.log("email: samuel@example.com");
      console.log("password: 123456");
      console.log("role: admin");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user", error);
  }
}
