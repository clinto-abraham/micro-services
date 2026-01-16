"use strict";

const Redis = require("ioredis");

let redis;

function initRedis() {
  if (redis) return redis;

  redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: process.env.REDIS_DB || 0,
    enableReadyCheck: true,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      return Math.min(times * 50, 2000);
    }
  });

  redis.on("connect", () => {
    console.log("🧠 Redis connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis error:", err.message);
  });

  return redis;
}

module.exports = initRedis();



// "use strict";

// const Redis = require("ioredis");

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   db: process.env.REDIS_DB
// });

// redis.on("connect", () => console.log("🧠 Redis connected"));
// redis.on("error", err => console.error("❌ Redis error", err));

// module.exports = redis;
