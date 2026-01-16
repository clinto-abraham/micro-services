"use strict";

const CircuitBreaker = require("opossum");

const breakers = {};

module.exports = function getBreaker(serviceName, action) {
  if (breakers[serviceName]) {
    return breakers[serviceName];
  }

  const breaker = new CircuitBreaker(action, {
    timeout: 6000,
    errorThresholdPercentage: 50,
    resetTimeout: 15000
  });

  breaker.on("open", () => {
    console.warn(`🚨 Circuit OPEN for ${serviceName}`);
  });

  breaker.on("halfOpen", () => {
    console.info(`🟡 Circuit HALF-OPEN for ${serviceName}`);
  });

  breaker.on("close", () => {
    console.info(`🟢 Circuit CLOSED for ${serviceName}`);
  });

  breakers[serviceName] = breaker;
  return breaker;
};
