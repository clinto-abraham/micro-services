"use strict";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } = require("./env");


module.exports = {
  host: REDIS_HOST || "127.0.0.1",
  port: Number(REDIS_PORT) || 6379,
  password: REDIS_PASSWORD || undefined,
  db: Number(REDIS_DB) || 1,

  // Connection behavior
  connectTimeout: 5000,
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,

  // Reconnect strategy
  retryStrategy: (times) => {
    if (times > 10) return null; // stop retrying
    return Math.min(times * 100, 2000);
  },

  // Keep SQL services responsive
  lazyConnect: true
};
