"use strict";

const crypto = require("crypto");

const IDEMPOTENCY_TTL_SEC = 10 * 60; // 10 minutes

module.exports = (redis) => {
  return async (req, res, next) => {
    try {
      // Route must explicitly enable idempotency
      if (!req.enableIdempotency) return next();

      const { payload, metadata } = req.body;
      const userId = metadata?.userContext?.userId || "anonymous";

      const payloadHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(payload || {}))
        .digest("hex");

      const key = `idem:${req.path}:${userId}:${payloadHash}`;

      const cachedResponse = await redis.get(key);
      if (cachedResponse) {
        return res.status(200).json(JSON.parse(cachedResponse));
      }

      const originalJson = res.json.bind(res);

      res.json = async (body) => {
        await redis.setex(key, IDEMPOTENCY_TTL_SEC, JSON.stringify(body));
        return originalJson(body);
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};


// // middlewares/idempotency.js
// const responseUtil = require("../utils/response");
// const ERRORS = require("../constants/errorCodes");

// module.exports = (redis) => async (req, res, next) => {
//   const key = req.headers["idempotency-key"];
//   const { requestId, route } = req.body || {};

//   if (!key) return next(); // optional, not mandatory

//   const redisKey = `idempotency:${route}:${key}`;

//   const cached = await redis.get(redisKey);
//   if (cached) {
//     return res.status(200).json(JSON.parse(cached));
//   }

//   // Capture response
//   const originalJson = res.json.bind(res);

//   res.json = (body) => {
//     redis.setex(redisKey, 600, JSON.stringify(body));
//     return originalJson(body);
//   };

//   next();
// };
