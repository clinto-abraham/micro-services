"use strict";
const { checkMail } = require("../services/mail.health");
const { healthMeta } = require("../utils/health.meta");

const healthCheck = async (req, res) => {
  const start = Date.now();
  const smtp = await checkMail();

  res.status(200).json({
    service: "mail-service",
    status: smtp === "UP" ? "UP" : "DEGRADED",
    checks: {
      http: "UP",
      smtp,
      ...healthMeta(start)
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
