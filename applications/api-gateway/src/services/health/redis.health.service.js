"use strict";

const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB || 0,
  lazyConnect: true
});

const checkRedis = async () => {
  try {
    await redis.connect();
    const res = await redis.ping();
    return res === "PONG" ? "UP" : "DOWN";
  } catch (err) {
    return "DOWN";
  } finally {
    redis.disconnect();
  }
};

module.exports = { checkRedis };
