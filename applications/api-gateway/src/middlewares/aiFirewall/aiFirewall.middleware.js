"use strict";

const { errorResponse } = require("../../utils/response.util");

const MAX_PROMPT_LENGTH = 4444;
const BLOCKED_PATTERNS = [
  /ignore previous instructions/i,
  /system prompt/i,
  /jailbreak/i
];

module.exports = function aiFirewall(req, res, next) {
  const prompt = req.body?.payload?.prompt || "";

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return res.status(413).json(
      errorResponse({
        message: "Prompt too large",
        errorCode: "PROMPT_TOO_LARGE",
        statusCode: 413,
        requestId: req.context.requestId
      })
    );
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(prompt)) {
      return res.status(403).json(
        errorResponse({
          message: "Unsafe AI prompt detected",
          errorCode: "AI_PROMPT_BLOCKED",
          statusCode: 403,
          requestId: req.context.requestId
        })
      );
    }
  }

  next();
};
