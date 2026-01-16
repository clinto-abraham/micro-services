"use strict";

const { errorResponse } = require("../../utils/response.util");

module.exports = function threatScoring(req, res, next) {
   console.log("👉 entering threatScoring");
  let score = 0;

  if (req.context.rateLimitExceeded) score += 20;
  if (req.context.timestampDrift) score += 15;
  if (req.context.newDevice) score += 25;
  if (req.context.aiFlagged) score += 30;
  if (req.context.roleViolation) score += 40;

  req.context.threatScore = score;

  // Hard block threshold
  if (score >= 60) {
    return res.status(403).json(
      errorResponse({
        message: "Request blocked due to high threat score",
        errorCode: "HIGH_THREAT_SCORE",
        statusCode: 403,
        requestId: req.context.requestId
      })
    );
  }

    console.log("👉 exiting threatScoring");
  next();
};
