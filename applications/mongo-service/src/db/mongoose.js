"use strict";

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

module.exports = mongoose;
