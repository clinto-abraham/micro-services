"use strict";
require("./src/configs/env");

const PORT = process.env.PORT;
const gracefulShutdown = require("./src/utils/shutdown");
const logger = require("./src/utils/logger");
const app = require("./src/app");

// require("./src/queues/ai.scheduler");
require("./src/queues/ai.worker");

app.listen(PORT, () => {
  logger.info(`🧠 AI-Service running on port ${PORT}`);
});

/**
 * Graceful shutdown
 */

process.on("SIGTERM", () => gracefulShutdown("SIGTERM", server));
process.on("SIGINT", () => gracefulShutdown("SIGINT", server));

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  gracefulShutdown("unhandledRejection", server);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  gracefulShutdown("uncaughtException", server);
});
