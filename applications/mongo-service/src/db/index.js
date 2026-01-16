"use strict";

const { default: mongoose } = require("./mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

// Optional connection listeners
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

module.exports = connectDB;

