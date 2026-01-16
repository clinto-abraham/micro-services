"use strict";

const axios = require("axios");
const services = require("../../configs/micro-services");
const { normalizeHealth } = require("./healthNormalizer.service");

const REQUEST_TIMEOUT = 3000;

const aggregateHealth = async () => {
  const results = await Promise.all(
    services.map(async (svc) => {
      const start = Date.now();

      try {
        const res = await axios.get(svc.url, {
          timeout: REQUEST_TIMEOUT
        });

        return normalizeHealth(
          svc.name,
          res.data,
          Date.now() - start
        );
      } catch (err) {
        return {
          service: svc.name,
          status: "DOWN",
          reason: err.message
        };
      }
    })
  );

  let overallStatus = "UP";

  if (results.some(r => r.status === "DOWN")) {
    overallStatus = "DOWN";
  } else if (results.some(r => r.status === "DEGRADED")) {
    overallStatus = "DEGRADED";
  }

  return {
    service: "api-gateway",
    status: overallStatus,
    services: results,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  aggregateHealth
};
