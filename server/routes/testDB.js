const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const databaseURL = "mongodb+srv://studentconnectdatabase:studentconnect@cluster0.ct0mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

// Connecting to MongoDB
mongoose.connect(databaseURL);

// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

module.exports = router;