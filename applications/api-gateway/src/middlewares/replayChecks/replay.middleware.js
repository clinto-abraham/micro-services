"use strict";

const redis = require("../../storage/redis");
const { errorResponse } = require("../../utils/response.util");

module.exports = async function replayProtection(req, res, next) {
  const requestId = req.context.requestId;
  const key = `replay:${requestId}`;

  const exists = await redis.get(key);
  if (exists) {
    return res.status(409).json(
      errorResponse({
        success: false,
        message: "Replay attack detected",
        errorCode: "REPLAY_ATTACK",
        statusCode: 409,
        requestId
      })
    );
  }

  // 10 minutes TTL
  await redis.set(key, "1", "EX", 600);
  next();
};
