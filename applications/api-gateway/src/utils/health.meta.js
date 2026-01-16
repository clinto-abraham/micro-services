"use strict";

const os = require("os");

const healthMeta = (startTime) => {
  const rss = process.memoryUsage().rss;

  return {
    responseTime: `${Date.now() - startTime}ms`,
    pid: process.pid,
    uptime: Math.floor(process.uptime()), // seconds
    memory: `${Math.round(rss / 1024 / 1024)}MB`
  };
};

const systemSnapshot = () => {
  return {
    cpuLoad1m: os.loadavg()[0],
    cpuCores: os.cpus().length,
    memory: {
      total: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
      free: `${Math.round(os.freemem() / 1024 / 1024)}MB`
    }
  };
};

module.exports = {
  healthMeta,
  systemSnapshot
};
