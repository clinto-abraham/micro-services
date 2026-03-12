"use strict";

const os = require("os");
const axios = require("axios");
const redis = require("../../storage/redis");

const SERVICES = [
  { name: "sql-service", url: "http://127.0.0.1:3000/health" },
  { name: "mongo-service", url: "http://127.0.0.1:4444/health" },
  { name: "ai-service", url: "http://127.0.0.1:5550/health" },
  { name: "payment-service", url: "http://127.0.0.1:8000/health" },
  { name: "mail-service", url: "http://127.0.0.1:9000/health" }
];

module.exports.healthCheck = async (req, res) => {
  const start = Date.now();

  const checks = {
    redis: "DOWN",
    system: {
      cpuLoad1m: os.loadavg()[0],
      cpuCores: os.cpus().length,
      memory: {
        total: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
        free: `${Math.round(os.freemem() / 1024 / 1024)}MB`,
        used: `${Math.round(
          (os.totalmem() - os.freemem()) / 1024 / 1024
        )}MB`
      }
    }
  };

  try {
    await redis.ping();
    checks.redis = "UP";
  } catch (_) {}

  const services = await Promise.all(
    SERVICES.map(async (svc) => {
      try {
        const r = await axios.get(svc.url, { timeout: 1500 });
        return { service: svc.name, status: r.data.status || "UP" };
      } catch (_) {
        return { service: svc.name, status: "DOWN" };
      }
    })
  );

  const responseTime = `${Date.now() - start}ms`;

  const degraded = services.some(s => s.status !== "UP") || checks.redis !== "UP";

  return res.json({
    service: "api-gateway",
    status: degraded ? "DEGRADED" : "UP",
    checks,
    services,
    responseTime,
    pid: process.pid,
    uptime: process.uptime(),
    memory: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
    timestamp: new Date().toISOString()
  });
};



// "use strict";

// const {
//   aggregateHealth
// } = require("../../services/health/healthAggregator.service");

// const healthCheck = async (req, res) => {
//   const result = await aggregateHealth();

//   res
//     .status(result.status === "UP" ? 200 : 503)
//     .json(result);
// };

// module.exports = {
//   healthCheck
// };


// // "use strict";

// // const { aggregateHealth } = require("../services/health.service");
// // const { checkRedis } = require("../services/redis.health.service");
// // const { checkSystem } = require("../services/system.health.service");
// // const { healthMeta } = require("../utils/health.meta");

// // const systemHealth = async (req, res) => {
// //   const start = Date.now();

// //   const [services, redisStatus] = await Promise.all([
// //     aggregateHealth(),
// //     checkRedis()
// //   ]);

// //   const system = checkSystem();

// //   const overall =
// //     redisStatus !== "UP" ||
// //     services.some(s => s.status !== "UP")
// //       ? "DEGRADED"
// //       : "UP";

// //   res.status(200).json({
// //     service: "api-gateway",
// //     status: overall,
// //     checks: {
// //       redis: redisStatus,
// //       system,
// //       ...healthMeta(start)
// //     },
// //     services,
// //     timestamp: new Date().toISOString()
// //   });
// // };

// // module.exports = { systemHealth };



























// // // const { aggregateHealth } = require("../services/health.service");

// // // const systemHealth = async (req, res) => {
// // //   const services = await aggregateHealth();

// // //   const overall =
// // //     services.some(s => s.status !== "UP") ? "DEGRADED" : "UP";

// // //   res.status(200).json({
// // //     service: "api-gateway",
// // //     status: overall,
// // //     services,
// // //     timestamp: new Date().toISOString()
// // //   });
// // // };

// // // module.exports = { systemHealth };



// // // "use strict";

// // // const axios = require("axios");
// // // const redisClient = require("../configs/redis"); // your Redis client
// // // const { 
// // //     SQL_MICROSERVICE_URL, 
// // //     MONGO_MICROSERVICE_URL,
// // //     AI_MICROSERVICE_URL,
// // //     WEBSOCKET_MICROSERVICE_URL,
// // //     CRON_MICROSERVICE_URL,
// // //     PAYMENT_MICROSERVICE_URL,
// // //     MAIL_MICROSERVICE_URL
// // //  } = require("../configs/env");


// // // /**
// // //  * Utility to check a downstream service health
// // //  */
// // // async function checkServiceHealth(url) {
// // //     try {
// // //         const response = await axios.get(url, { timeout: 3000 });
// // //         return {
// // //             status: "healthy",
// // //             statusCode: response.status,
// // //             data: response.data,
// // //         };
// // //     } catch (err) {
// // //         return {
// // //             status: "unhealthy",
// // //             error: err.message || "Service unreachable",
// // //         };
// // //     }
// // // }

// // // exports.health = async (req, res) => {
// // //     const report = {
// // //         gateway: { status: "healthy", timestamp: new Date() },
// // //         services: {},
// // //         redis: { status: "unknown" },
// // //     };

// // //     // Array of service health checks
// // //     const servicesToCheck = {
// // //         "sql-service": `${SQL_MICROSERVICE_URL}/health`, 
// // //         "mongo-service": `${MONGO_MICROSERVICE_URL}/health`,
// // //         "ai-service": `${AI_MICROSERVICE_URL}/health`, 
// // //         "websocket-service": `${WEBSOCKET_MICROSERVICE_URL}/health`, 
// // //         "cron-service": `${CRON_MICROSERVICE_URL}/health`, 
// // //         "payment-service": `${PAYMENT_MICROSERVICE_URL}/health`, 
// // //         "mail-service": `${MAIL_MICROSERVICE_URL}/health`,
// // //     };

// // //     // Health checks for each microservice
// // //     await Promise.all(
// // //         Object.keys(servicesToCheck).map(async (key) => {
// // //             report.services[key] = await checkServiceHealth(
// // //                 servicesToCheck[key]
// // //             );
// // //         })
// // //     );

// // //     // Redis health check
// // //     try {
// // //         await redisClient.ping();
// // //         report.redis.status = "healthy";
// // //     } catch (err) {
// // //         report.redis.status = "unhealthy";
// // //         report.redis.error = err.message;
// // //     }

// // //     // Determine overall health
// // //     const allHealthy =
// // //         report.redis.status === "healthy" &&
// // //         Object.values(report.services).every(
// // //             (s) => s.status === "healthy"
// // //         );

// // //     return res.status(allHealthy ? 200 : 503).json(report);
// // // };
