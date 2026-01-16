const { SQL_MICROSERVICE_PORT, MONGO_MICROSERVICE_PORT, AI_MICROSERVICE_PORT, WEBSOCKET_MICROSERVICE_PORT, CRON_MICROSERVICE_PORT, PAYMENT_SERVICE_PORT, MAIL_SERVICE_PORT, NOTIFICATION_SERVICE_PORT } = require("../../configs/env");

module.exports = {
  "sql-service": {
    name: "sql-service",
    target: `http://127.0.0.1:${SQL_MICROSERVICE_PORT || 3000}`,
    publicPrefix: "sql"
  },

  "mongo-service": {
    name: "mongo-service",
    target: `http://127.0.0.1:${MONGO_MICROSERVICE_PORT || 4000}`,
    publicPrefix: "mongo"
  },

  "ai-service": {
    name: "ai-service",
    target: `http://127.0.0.1:${AI_MICROSERVICE_PORT || 5550}`,
    publicPrefix: "ai"
  },

  "websocket-service": {
    name: "websocket-service",
    target: `http://127.0.0.1:${WEBSOCKET_MICROSERVICE_PORT || 6000}`,
  },

  "cron-service": {
    name: "cron-service",
    target: `http://127.0.0.1:${CRON_MICROSERVICE_PORT || 7000}`,
  },

  "payment-service": {
    name: "payment-service",
    target: `http://127.0.0.1:${PAYMENT_SERVICE_PORT || 8000}`,
    publicPrefix: "payment"
  },

  "mail-service": {
    name: "mail-service",
    target: `http://127.0.0.1:${MAIL_SERVICE_PORT || 9000}`,
    publicPrefix: "mail"
  },

  "notification-service": {
    name: "notification-service",
    target: `http://127.0.0.1:${NOTIFICATION_SERVICE_PORT || 9990}`,
    publicPrefix: "notification"
  }
};
