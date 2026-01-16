"use strict";

const mongoose = require("../../../db/mongoose");

/**
 * MongoDB health check
 * - Uses connection state
 * - Executes a lightweight ping
 */
module.exports = async () => {
  try {
    // 1 = connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected");
    }

    // Low-cost ping to admin DB
    await mongoose.connection.db.admin().ping();

    return {
      name: "database",
      type: "mongodb",
      status: "UP"
    };
  } catch (err) {
    return {
      name: "database",
      type: "mongodb",
      status: "DOWN",
      error: err.message
    };
  }
};
