"use strict";

const healthService = require("../services/health");

const healthCheck = async (req, res) => {
  try {
    const startTime = req.app.locals.serviceStartTime;

    const result = await healthService.check({ startTime });

    res.status(result.httpCode).json(result.payload);
  } catch (err) {
    res.status(500).json({
      timestamp: new Date().toISOString(),
      state: "UNKNOWN",
      live: { status: "DOWN" },
      ready: { status: "DOWN" },
      error: err.message
    });
  }
};

module.exports = { healthCheck };




// "use strict";
// const { checkMongo } = require("../services/mongo.health.service");
// const { healthMeta } = require("../utils/health.meta");

// const healthCheck = async (req, res) => {
//   const start = Date.now();
//   const mongo = await checkMongo();

//   res.status(200).json({
//     service: "mongo-service",
//     status: mongo === "UP" ? "UP" : "DEGRADED",
//     checks: {
//       http: "UP",
//       mongo,
//       ...healthMeta(start)
//     },
//     timestamp: new Date().toISOString()
//   });
// };

// module.exports = { healthCheck };



// "use strict";

// const mongoose = require("mongoose");
// // const response = require("../helpers/response");
// const config = require("../configs/index");
// // const connectMongo = require("../configs/mongoose");

// exports.healthCheck = async (req, res) => {
//   // Mongoose connection states:
//   // 0 = disconnected
//   // 1 = connected
//   // 2 = connecting
//   // 3 = disconnecting
//   const mongoState = mongoose.connection.readyState;

//   const mongoStatusMap = {
//     0: "disconnected",
//     1: "connected",
//     2: "connecting",
//     3: "disconnecting"
//   };

//   // Microservice status (here: data-service)
//   const serviceStatus = {
//     name: "data-service",
//     status: "running",
//     uptime: process.uptime(),
//     environment: config.app.env,
//     mongodb_status: mongoStatusMap[mongoState],
//     numericState: mongoState,

//   };

//   // Final Response
//   return res.json({
//     success: true,
//     service: serviceStatus,
//     database: {
//       status: mongoStatusMap[mongoState],
//       numericState: mongoState,
//       name: "mongodb"
//     },
//     timestamp: new Date().toISOString()
//   });
// };
