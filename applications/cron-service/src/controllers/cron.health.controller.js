"use strict";

const { healthMeta } = require("../utils/health.meta");

const healthCheck = (req, res) => {
  const start = Date.now();

  res.status(200).json({
    service: "cron-service",
    status: "UP",
    checks: {
      scheduler: "RUNNING",
      ...healthMeta(start)
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
