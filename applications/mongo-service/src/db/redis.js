"use strict";

const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: Number(process.env.REDIS_DB) || 0,

  lazyConnect: true,
  connectTimeout: 5000,
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,

  retryStrategy(times) {
    if (times > 10) return null;
    return Math.min(times * 100, 2000);
  }
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", err => {
  console.error("Redis error:", err.message);
});

module.exports = redis;
