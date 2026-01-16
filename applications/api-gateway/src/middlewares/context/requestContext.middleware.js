"use strict";

const { v4: uuid } = require("uuid");

module.exports = (req, res, next) => {
  req.context = {
    requestId: req.headers["x-request-id"] || `req_${uuid()}`,
    route: req.originalUrl,
    timestamp: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"]
  };

  req.headers["x-request-id"] = req.context.requestId;
  next();
};
