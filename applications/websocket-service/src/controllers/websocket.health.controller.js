"use strict";

const { checkWebSocket } = require("../services/ws.health");
const { healthMeta } = require("../utils/health.meta");

const healthCheck = (req, res) => {
  const start = Date.now();
  const websocket = checkWebSocket();

  res.status(200).json({
    service: "websocket-service",
    status: websocket === "UP" ? "UP" : "DEGRADED",
    checks: {
      http: "UP",
      websocket,
      ...healthMeta(start)
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
