"use strict";

const { checkChatGPT } = require("../services/chatgpt.health.service");
const { checkGemini } = require("../services/gemini.health.service");
const { healthMeta } = require("../utils/health.meta");

const healthCheck = async (req, res) => {
  const start = Date.now();

  const [chatgpt, gemini] = await Promise.all([
    checkChatGPT(),
    checkGemini()
  ]);

  const status =
    chatgpt === "UP" && gemini === "UP"
      ? "UP"
      : "DEGRADED";

  res.status(200).json({
    service: "ai-service",
    status,
    checks: {
      http: "UP",
      chatgpt,
      gemini,
      ...healthMeta(start)
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
