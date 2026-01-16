"use strict";

const express = require("express");
const router = express.Router();

const socketRegistry = require("../services/socket.registry");
const logger = require("../utils/logger");

/**
 * INTERNAL ONLY
 * Used by ai-service / gateway
 */
router.post("/internal/ai/emit", (req, res) => {
  const { userId, payload } = req.body;

  if (!userId || !payload) {
    return res.status(400).json({
      error: "userId and payload are required"
    });
  }

  const ws = socketRegistry.getSocket(userId);

  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({
      type: "AI_RESPONSE",
      data: payload
    }));

    logger.info("AI response delivered to user:", userId);

    return res.json({ delivered: true });
  }

  logger.warn("User not connected:", userId);
  return res.json({ delivered: false });
});

module.exports = router;
