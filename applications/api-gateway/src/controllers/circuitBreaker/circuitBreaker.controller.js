"use strict";

const getBreaker = require("./circuitBreaker.factory");
const { errorResponse } = require("../../utils/response.util");

function circuitBreakerController(serviceName) {
  console.log("👉 entering circuitBreaker");
  return (req, res, next) => {
    console.log(req.body, "req.body")
    const breaker = getBreaker(serviceName, () => Promise.resolve());

    breaker
      .fire()
      .then(() => {
        console.log("👉 exiting after .then circuitBreaker");
        next()
      })
      .catch(() => {
        console.log("👉 exiting after .catch circuitBreaker");
        return res.status(503).json(
          errorResponse({
            message: `${serviceName} temporarily unavailable`,
            errorCode: "SERVICE_CIRCUIT_OPEN",
            statusCode: 503,
            requestId: req.context.requestId
          })
        );
      });
  };
};

module.exports = {
  circuitBreakerController
}