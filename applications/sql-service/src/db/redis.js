"use strict";

const Redis = require("ioredis");
const config = require("../configs/redis.config");

const redis = new Redis(config);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

redis.on("close", () => {
  console.warn("Redis connection closed");
});

module.exports = redis;
