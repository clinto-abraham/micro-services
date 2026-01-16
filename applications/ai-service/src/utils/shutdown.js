"use strict";

const logger = require("./logger");
const { shutdownRedis } = require("../redis/redis.client");

let isShuttingDown = false;

async function gracefulShutdown(signal, server) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.warn(`🛑 ${signal} received. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      logger.info("✅ HTTP/WebSocket server closed");
    }

    await shutdownRedis();
    logger.info("✅ Redis connections closed");

    process.exit(0);
  } catch (err) {
    logger.error("❌ Error during shutdown", err);
    process.exit(1);
  }
}

module.exports = gracefulShutdown;
