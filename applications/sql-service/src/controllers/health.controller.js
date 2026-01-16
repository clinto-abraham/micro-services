"use strict";

const healthService = require("../services/health");

const serviceStartTime = Date.now();

const healthCheck = async (req, res) => {
  const result = await healthService.check({
    startTime: serviceStartTime
  });

  res.status(result.httpCode).json(result.payload);
};

module.exports = {
  healthCheck
};

