"use strict";
require("./src/configs/env");

const app = require("./src/app");
const { default: mongoose } = require("./src/db/mongoose");

const PORT = process.env.PORT || 4444;


const server = app.listen(PORT, () => {
  console.log(` 🚀 Mongo service running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed (SIGTERM)");

  console.log("SIGTERM received. Shutting down server...");
  server.close(() => process.exit(0));
  
  process.exit(0);
});



process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed (SIGINT)");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  
});