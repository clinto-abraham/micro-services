"use strict";

const redis = require("../../storage/redis");
const { errorResponse } = require("../../utils/response.util");

module.exports = function rateLimit({ limit, windowSeconds }) {
  return async (req, res, next) => {
    const userId = req.context.userContext.userId;
    const ip = req.context.ip;

    const key = `rl:${userId}:${ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (count > limit) {
      return res.status(429).json(
        errorResponse({
          success: false,
          message: "Rate limit exceeded",
          errorCode: "RATE_LIMIT_EXCEEDED",
          statusCode: 429,
          requestId: req.context.requestId
        })
      );
    }

    next();
  };
};
