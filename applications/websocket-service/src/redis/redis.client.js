"use strict";

const Redis = require("ioredis");
const env = require("../configs/env");

let clients = null;

/**
 * 🔧 Common Redis options (single source of truth)
 */
function buildOptions(extra = {}) {
  return {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    username: env.REDIS_USERNAME || undefined,
    password: env.REDIS_PASSWORD || undefined,
    db: Number(env.REDIS_DB) || 11,

    // 🔁 Reconnection strategy
    retryStrategy(times) {
      const delay = Math.min(times * 1000, 5000);
      console.warn(`🔁 Redis retry #${times}, retrying in ${delay}ms`);
      return delay;
    },

    // ⏱ Connection hardening
    connectTimeout: 10_000,
    keepAlive: 10_000,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,

    // 🧯 Fail fast if auth is wrong
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

  const baseOptions = buildOptions();

  const redis = new Redis(baseOptions);

  const pub = new Redis(
    buildOptions({
      db: Number(env.REDIS_DB) || 0,
    })
  );

  const sub = new Redis(
    buildOptions({
      db: Number(env.REDIS_DB) || 0,
    })
  );

  // 🪵 Logging
  [redis, pub, sub].forEach((client, idx) => {
    const label = ["redis", "pub", "sub"][idx];

    client.on("connect", () =>
      console.log(`🟢 Redis ${label} connected`)
    );

    client.on("ready", () =>
      console.log(`✅ Redis ${label} ready`)
    );

    client.on("error", (err) =>
      console.error(`🔴 Redis ${label} error:`, err.message)
    );

    client.on("close", () =>
      console.warn(`⚠️ Redis ${label} connection closed`)
    );
  });

  clients = { redis, pub, sub };
  return clients;
}

/**
 * 🚪 Graceful shutdown
 */
async function shutdownRedis() {
  if (!clients) return;

  console.log("🛑 Closing Redis connections...");
  await Promise.allSettled([
    clients.redis.quit(),
    clients.pub.quit(),
    clients.sub.quit(),
  ]);
}

module.exports = {
  initRedis,
  shutdownRedis,
};


// "use strict";

// const Redis = require("ioredis");
// const { REDIS_URL } = require("../configs/env");

// const pub = new Redis(REDIS_URL);
// const sub = new Redis(REDIS_URL);
// const redis = new Redis(REDIS_URL);

// module.exports = { pub, sub, redis };
