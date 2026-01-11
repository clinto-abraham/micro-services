"use strict";

function startPoolMonitor(sequelize, options = {}) {
  const {
    checkIntervalMs = 60 * 1000,
    highUseThreshold = 0.75,
    lowIdleThreshold = 0.80,
    maxLimit = 20,
    minLimit = 2,
    scaleStep = 2,
  } = options;

  let inCooldown = false;

  setInterval(() => {
    const pool = sequelize.connectionManager.pool;
    if (!pool) return;

    const size = pool.size;
    const available = pool.available;
    const inUse = size - available;

    if (size === 0) return;

    const usageRatio = inUse / size;
    const idleRatio = available / size;

    if (!inCooldown && usageRatio > highUseThreshold && size + scaleStep <= maxLimit) {
      sequelize.options.pool.max = size + scaleStep;
      console.log(`📈 DB Pool scaled UP to max=${sequelize.options.pool.max}`);
      inCooldown = true;
      setTimeout(() => (inCooldown = false), checkIntervalMs);
    }

    if (!inCooldown && idleRatio > lowIdleThreshold && size - scaleStep >= minLimit) {
      sequelize.options.pool.max = Math.max(minLimit, size - scaleStep);
      console.log(`📉 DB Pool scaled DOWN to max=${sequelize.options.pool.max}`);
      inCooldown = true;
      setTimeout(() => (inCooldown = false), checkIntervalMs);
    }
  }, checkIntervalMs);
}

module.exports = startPoolMonitor; // <--- IMPORTANT!
