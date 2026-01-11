"use strict";

/**
 * Lightweight health metadata generator.
 * Safe to use in ALL micro-services.
 * System-level metrics must be handled ONLY by api-gateway.
 *
 * @param {number} startTime - Date.now() when health check started
 */
const healthMeta = (startTime) => {
  const rss = process.memoryUsage().rss;

  return {
    responseTime: `${Date.now() - startTime}ms`,
    pid: process.pid,
    uptime: Math.floor(process.uptime()), // seconds
    memory: `${Math.round(rss / 1024 / 1024)}MB`
  };
};

module.exports = { healthMeta };
