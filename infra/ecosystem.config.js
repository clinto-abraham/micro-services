const path = require('path');

const BASE = __dirname;

const PROD_CREDENTIAL = {
  // ===============================
  // Core App
  // ===============================
  NODE_ENV: 'production',
  HEALTH_TOKEN:
    'lifeisAwesome@AdonaiYeshuaWhoTeacheslifeIsFairUnderHisWings.OurLord,IsRighteousGod',

  // ===============================
  // Internal Security
  // ===============================
  MONGO_URI: 'mongodb://127.0.0.1:27017/event_management',
  GATEWAY_HMAC_SECRET: 'gateway-hmac-secret',
  INTERNAL_API_TOKEN: 'internal_secret_1231231255683kalsl',
  INTERNAL_HMAC_SECRET: 'gateway_hmac_secret_6968cc528c78d2b8727e96f9',
  INTERNAL_SERVICE_SECRET:
    'lifeisAwesome@AdonaiYeshuaWhoTeacheslifeIsFairUnderHisWings.OurLord,IsRighteousGod',

  // ===============================
  // Service URLs
  // ===============================
  API_GATEWAY_MICROSERVICE_URL: 'http://localhost:2000',
  SQL_MICROSERVICE_URL: 'http://localhost:3000/sql',
  MONGO_MICROSERVICE_URL: 'http://localhost:4000/mongo',
  AI_MICROSERVICE_URL: 'http://localhost:5550/ai',
  WEBSOCKET_MICROSERVICE_URL: 'http://localhost:6000/websocket',
  CRON_MICROSERVICE_URL: 'http://localhost:7000/cron',
  PAYMENT_SERVICE_URL: 'http://localhost:8000/payment',
  MAIL_SERVICE_URL: 'http://localhost:9000/mail',
  NOTIFICATION_SERVICE_URL: 'http://localhost:9990/notification',

  // ===============================
  // Service Ports
  // ===============================
  API_GATEWAY_MICROSERVICE_PORT: 2000,
  SQL_MICROSERVICE_PORT: 3000,
  MONGO_MICROSERVICE_PORT: 4000,
  AI_MICROSERVICE_PORT: 5550,
  WEBSOCKET_MICROSERVICE_PORT: 6000,
  CRON_MICROSERVICE_PORT: 7000,
  PAYMENT_SERVICE_PORT: 8000,
  MAIL_SERVICE_PORT: 9000,
  NOTIFICATION_SERVICE_PORT: 9990,

  // ===============================
  // Redis
  // ===============================
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_PASSWORD: 'redisIsStartedOnDec15Of2025',
  REDIS_URL: 'redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379',

  // ===============================
  // SMTP
  // ===============================
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'test@gmail.com',
  SMTP_PASS: 'app_password',

  // ===============================
  // PostgreSQL (SQL)
  // ===============================
  DB_HOST: '127.0.0.1',
  DB_USER: 'server-user',
  DB_PASSWORD: 'server-user-clinto',
  DB_NAME: 'database_production',
  DB_PORT: 5432,

  // ===============================
  // Auth / JWT
  // ===============================
  SERVICE_JWT_SECRET: 'service_secret_example',
  JWT_SECRET: 'user_jwt_secret',
  JWT_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  BCRYPT_SALT_ROUNDS: 12,
  TWO_FA_ISSUER: 'salesforce',

  // ===============================
  // Rate Limiting
  // ===============================
  RATE_LIMIT_MAX: 100,
  RATE_LIMIT_WINDOW: 15,

  // ===============================
  // AI
  // ===============================
  OPENAI_API_KEY: '1234adff3qwrsd2',
  LOCAL_LLM_URL: 'http://localhost:11434',
};

/**
 * ⚙️ Shared PM2 process stability config
 */
const COMMON_PROCESS = {
  watch: false,
  exec_mode: 'fork',

  autorestart: true,
  min_uptime: '30s',
  max_restarts: 3,
  restart_delay: 5000,

  kill_timeout: 12000,
  listen_timeout: 5000,
};

module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: path.join(BASE, '../applications/api-gateway/server.js'),
      instances: 1,
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'API_GATEWAY_MICROSERVICE',
        PORT: 2000,
        REDIS_DB: 0,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'sql-service',
      script: path.join(BASE, '../applications/sql-service/server.js'),
      instances: 1,
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3000,
        REDIS_DB: 1,
        SERVICE_NAME: 'SQL_MICROSERVICE',
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'mongo-service',
      script: path.join(BASE, '../applications/mongo-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'MONGO_MICROSERVICE',
        PORT: 4000,
        REDIS_DB: 2,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'ai-service',
      script: path.join(BASE, '../applications/ai-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'AI_MICROSERVICE',
        PORT: 5550,
        REDIS_DB: 3,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'websocket-service',
      script: path.join(BASE, '../applications/websocket-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'WS_MICROSERVICE',
        PORT: 6000,
        REDIS_DB: 4,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'cron-service',
      script: path.join(BASE, '../applications/cron-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'CRON_MICROSERVICE',
        PORT: 7000,
        REDIS_DB: 5,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'payment-service',
      script: path.join(BASE, '../applications/payment-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'PAYMENT_MICROSERVICE',
        PORT: 8000,
        REDIS_DB: 6,
        ...PROD_CREDENTIAL,
      },
    },

    {
      name: 'mail-service',
      script: path.join(BASE, '../applications/mail-service/server.js'),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        SERVICE_NAME: 'MAIL_MICROSERVICE',
        PORT: 9000,
        REDIS_DB: 7,
        ...PROD_CREDENTIAL,
      },
    },
  ],
};
