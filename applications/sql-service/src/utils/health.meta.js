"use strict";

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
