"use strict";

const logger = require("../services/loggers/logger.service");

module.exports = (req, res, next) => {
  const start = Date.now();

  const log = {
    service: "sql-microservice",
    method: req.method,
    path: req.originalUrl,
    query: req.query,
    headers: {
      "user-agent": req.headers["user-agent"],
      "x-request-id": req.headers["x-request-id"]
    },
    requestBody: req.body || null
  };

  res.on("finish", () => {
    logger.log({
      ...log,
      statusCode: res.statusCode,
      responseTimeMs: Date.now() - start
    });
  });

  next();
};
