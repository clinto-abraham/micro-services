"use strict";

const os = require("os");

const checkSystem = () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    cpuLoad1m: os.loadavg()[0],          // 1 minute load avg
    cpuCores: os.cpus().length,
    memory: {
      total: `${Math.round(totalMem / 1024 / 1024)}MB`,
      used: `${Math.round(usedMem / 1024 / 1024)}MB`,
      free: `${Math.round(freeMem / 1024 / 1024)}MB`
    }
  };
};

module.exports = { checkSystem };
