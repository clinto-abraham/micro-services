"use strict";

module.exports = function notFound(req, res) {
  res.status(404).json({
    success: false,
    errorCode: "RESOURCE_NOT_FOUND",
    message: `Route ${req.originalUrl} not found`
  });
};
