"use strict";
// middlewares/rateLimiter.js
// const response = require("../utils/response");

module.exports = (redis, options = {}) => {
  const {
    windowSec = 10,
    max = 10
  } = options;

  return async (req, res, next) => {
    const { deviceId, route, requestId } = req.body || {};
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    if (!deviceId || !route) return next();

    const key = `rl:${route}:${deviceId}:${ip}`;

    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSec);
    }

    if (count > max) {
      return res.status(429).json(
{
          errorCode: "RATE_LIMITED",
          message: "Too many requests. Please slow down.",
          requestId
        }
      );
    }

    next();
  };
};



// const rateLimit = require("express-rate-limit");

/**
 * Global API rate limiter
 * 
 * Helps protect against basic DDoS,
 * brute force attacks, and abusive API usage.
 */
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500,                 // limit each IP to 500 requests per window
//   standardHeaders: true,    // Return rate limit info in headers
//   legacyHeaders: false,     // Disable deprecated headers

//   message: {
//     success: false,
//     message: "Too many requests, please try again later."
//   }
// });

// module.exports = { apiLimiter };