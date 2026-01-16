"use strict";

const logger = require("../../configs/logger");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env")
});

module.exports = (err, req, res, next) => {
  // Log detailed error for debugging or monitoring
  logger.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    path: req.originalUrl,
    method: req.method
  });

  // Format error response
  const statusCode = err.status || 500;

  // Never expose internal stack traces in production
  const response = {
    success: false,
    message: err.message || "Internal Server Error"
  };

  // Optional: include stacktrace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};
