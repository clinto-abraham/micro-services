"use strict";

const mongoose = require("mongoose");

const checkMongo = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "DOWN";
    }

    await mongoose.connection.db.admin().ping();
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkMongo };
