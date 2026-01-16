"use strict";

const check = async (startTime) => {
  const mem = process.memoryUsage();

  return {
    name: "process",
    status: "UP",
    pid: process.pid,
    uptimeSec: Math.floor(process.uptime()),
    responseTimeMs: Date.now() - startTime,
    memory: {
      rssMB: Math.round(mem.rss / 1024 / 1024),
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
      externalMB: Math.round(mem.external / 1024 / 1024)
    }
  };
};

module.exports = {
  check
};
