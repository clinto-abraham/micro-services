"use strict";

const Redis = require("ioredis");
const env = require("../configs/env");

let clients = null;

/**
 * 🔧 Base Redis options
 */
function buildOptions(extra = {}) {
  return {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    username: env.REDIS_USERNAME || undefined,
    password: env.REDIS_PASSWORD || undefined,
    db: Number(env.REDIS_DB) || 11,

    retryStrategy(times) {
      const delay = Math.min(times * 1000, 5000);
      console.warn(`🔁 Redis retry #${times}, retrying in ${delay}ms`);
      return delay;
    },

    connectTimeout: 10_000,
    keepAlive: 10_000,

    reconnectOnError(err) {
      const msg = err?.message || "";
      if (msg.includes("WRONGPASS") || msg.includes("NOAUTH")) {
        console.error("❌ Redis auth error, will NOT retry");
        return false;
      }
      return true;
    },

    ...extra,
  };
}

/**
 * 🧠 Initialize Redis clients ONCE
 */
function initRedis() {
  if (clients) return clients;

  // 🧱 General purpose Redis
  const redis = new Redis(buildOptions());

  // 📢 Pub/Sub
  const pub = new Redis(buildOptions());
  const sub = new Redis(buildOptions());

  // 🐂 BullMQ Redis (SPECIAL RULES)
  const queue = new Redis(
    buildOptions({
      maxRetriesPerRequest: null,   // REQUIRED
      enableReadyCheck: false       // REQUIRED
    })
  );

  // 🪵 Logging
  [redis, pub, sub, queue].forEach((client, idx) => {
    const label = ["redis", "pub", "sub", "queue"][idx];

    client.on("connect", () =>
      console.log(`🟢 Redis ${label} connected`)
    );

    client.on("error", err =>
      console.error(`🔴 Redis ${label} error:`, err.message)
    );
  });

  clients = { redis, pub, sub, queue };
  return clients;
}

/**
 * 🚪 Graceful shutdown
 */
async function shutdownRedis() {
  if (!clients) return;

  console.log("🛑 Closing Redis connections...");
  await Promise.allSettled(
    Object.values(clients).map(c => c.quit())
  );
}

module.exports = {
  initRedis,
  shutdownRedis,
};
