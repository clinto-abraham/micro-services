"use strict";
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "./.env")
});

console.log(process.env.MONGO_URI, "process.env.MONGO_URI")
module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 4444
  },

  db: {
    uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/seatbooking"
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "change_this_secret"
  },

  mail: {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
  }
};
