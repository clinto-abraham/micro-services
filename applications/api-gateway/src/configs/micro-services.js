"use strict";

const { SQL_MICROSERVICE_PORT, MONGO_MICROSERVICE_PORT, AI_MICROSERVICE_PORT, WEBSOCKET_MICROSERVICE_PORT, CRON_MICROSERVICE_PORT, PAYMENT_SERVICE_PORT, MAIL_SERVICE_PORT } = require("./env");

/**
 * Gateway health service registry
 * Derived from local micro-service ports
 */

const SERVICES = [
  { name: "sql-microservice", ext: "/sql", port: SQL_MICROSERVICE_PORT || 3000 },
  { name: "mongo-microservice", ext: "/mongo", port: MONGO_MICROSERVICE_PORT || 4444 },
  { name: "ai-microservice", ext: "/ai", port: AI_MICROSERVICE_PORT || 5550 },
  { name: "websocket-microservice", ext: "/socket", port: WEBSOCKET_MICROSERVICE_PORT || 6000 },
  { name: "cron-microservice", ext: "/cron", port: CRON_MICROSERVICE_PORT || 7000 },
  { name: "payment-microservice", ext: "/pay", port: PAYMENT_SERVICE_PORT || 8000 },
  { name: "mail-microservice", ext: "/mail", port: MAIL_SERVICE_PORT || 9000 }
];

const HEALTH_PATH = "/health";

module.exports = SERVICES.map(service => ({
  name: service.name,
  url: `http://localhost:${service.port}${service.ext}${HEALTH_PATH}`
}));
