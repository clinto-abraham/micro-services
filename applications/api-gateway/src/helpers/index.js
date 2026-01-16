// "use strict";

// const Redis = require("ioredis");
// const logger = require("../configs/logger");

// const REDIS_URL = process.env.REDIS_URL || "redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379";

// const redisClient = new Redis(REDIS_URL, {
//   retryStrategy(times) {
//     return Math.min(times * 50, 2000);
//   }
// });

// redisClient.on("connect", () => logger.info("🔌 Redis connected"));
// redisClient.on("error", (err) => logger.error("❌ Redis error:", err));

// async function checkRedisStatus() {
//   try {
//     const pong = await redisClient.ping();
//     return { ok: pong === "PONG" };
//   } catch (err) {
//     return { ok: false, error: err.message };
//   }
// }

// /**
//  * FUNCTION-BASED HELPERS
//  */
// const get = (key) => redisClient.get(key);

// const set = (key, value, ttl = 60) =>
//   redisClient.set(key, value, "EX", ttl);

// const del = (key) => redisClient.del(key);

// const setJSON = (key, value, ttl = 60) =>
//   redisClient.set(key, JSON.stringify(value), "EX", ttl);

// const getJSON = async (key) => {
//   const val = await redisClient.get(key);
//   return val ? JSON.parse(val) : null;
// };

// /**
//  * EXPORT ONLY THIS OBJECT
//  */
// module.exports = {
//   redis: redisClient,  // <-- the actual redis instance
//   checkRedisStatus,
//   get,
//   set,
//   del,
//   setJSON,
//   getJSON,
// };


// // "use strict";

// // const Redis = require("ioredis");
// // const logger = require("../configs/logger");

// // const REDIS_URL = process.env.REDIS_URL || "redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379";

// // const redis = new Redis(REDIS_URL, {
// //   retryStrategy(times) {
// //     return Math.min(times * 50, 2000);
// //   }
// // });

// // redis.on("connect", () => logger.info("🔌 Redis connected"));
// // redis.on("error", (err) => logger.error("❌ Redis error:", err));

// // const get = (key) => redis.get(key);

// // const set = (key, value, ttl = 60) =>
// //   redis.set(key, value, "EX", ttl);

// // const del = (key) => redis.del(key);

// // const setJSON = (key, value, ttl = 60) =>
// //   redis.set(key, JSON.stringify(value), "EX", ttl);

// // const getJSON = async (key) => {
// //   const val = await redis.get(key);
// //   return val ? JSON.parse(val) : null;
// // };

// // module.exports = {
// //   redis,
// //   get,
// //   set,
// //   del,
// //   setJSON,
// //   getJSON
// // };
