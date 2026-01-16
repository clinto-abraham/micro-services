"use strict";

/**
 * Health endpoint auth
 * Uses static token for internal calls (gateway / ops)
 *
 * Enable by setting:
 * HEALTH_TOKEN=some-secret
 */
module.exports = (req, res, next) => {
  const expectedToken = process.env.HEALTH_TOKEN;

  // 🔓 Auth disabled if token not set
  if (!expectedToken) {
    return next();
  }

  const token =
    req.headers["x-health-token"] ||
    req.headers["authorization"];

  if (!token || token !== expectedToken) {
    return res.status(401).json({
      error: "UNAUTHORIZED_HEALTH_CHECK"
    });
  }

  next();
};
