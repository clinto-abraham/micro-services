"use strict";

const path = require("path");
const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV || "production";
const envFile = `.env.${process.env.NODE_ENV || "production"}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

console.log(
  "[BOOT]",
  "NODE_ENV =", process.env.NODE_ENV,
  "REDIS_PASSWORD =", process.env.REDIS_PASSWORD ? "SET" : "MISSING"
);
// # ----------------------------------
// # App
// # ----------------------------------

const PORT = process.env.PORT || 2000;
const SERVICE_NAME = process.env.MICRO_SERVICE_NAME || "API_MICROSERVICE"

const API_GATEWAY_MICROSERVICE_URL = process.env.API_GATEWAY_MICROSERVICE_URL || "http://localhost:2000"
const SQL_MICROSERVICE_URL = process.env.SQL_MICROSERVICE_URL || "http://localhost:3000/sql"
const MONGO_MICROSERVICE_URL = process.env.MONGO_MICROSERVICE_URL || "http://localhost:4444/mongo"
const AI_MICROSERVICE_URL = process.env.AI_MICROSERVICE_URL || "http://localhost:5000/ai"
const WEBSOCKET_MICROSERVICE_URL = process.env.WEBSOCKET_MICROSERVICE_URL || "http://localhost:6000/websocket"
const CRON_MICROSERVICE_URL = process.env.CRON_MICROSERVICE_URL || "http://localhost:7000/cron"
const PAYMENT_MICROSERVICE_URL = process.env.PAYMENT_MICROSERVICE_URL || "http://localhost:8000/payment"
const MAIL_MICROSERVICE_URL = process.env.MAIL_MICROSERVICE_URL || "http://localhost:9000/mail"

const INTERNAL_SERVICE_SECRET = process.env.INTERNAL_SERVICE_SECRET;

const API_GATEWAY_MICROSERVICE_PORT = process.env.API_GATEWAY_MICROSERVICE_PORT || 2000
const SQL_MICROSERVICE_PORT = process.env.SQL_MICROSERVICE_PORT || 3000
const MONGO_MICROSERVICE_PORT = process.env.MONGO_MICROSERVICE_PORT || 4444
const AI_MICROSERVICE_PORT = process.env.AI_MICROSERVICE_PORT || 5550
const WEBSOCKET_MICROSERVICE_PORT = process.env.WEBSOCKET_MICROSERVICE_PORT || 6000
const CRON_MICROSERVICE_PORT = process.env.CRON_MICROSERVICE_PORT || 7000
const PAYMENT_SERVICE_PORT = process.env.PAYMENT_SERVICE_PORT || 8000
const MAIL_SERVICE_PORT = process.env.MAIL_SERVICE_PORT || 9000
const NOTIFICATION_SERVICE_PORT = process.env.NOTIFICATION_SERVICE_PORT || 9000

// # ----------------------------------
// # Database
// # ----------------------------------
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
// # ----------------------------------
// # JWT
// # ----------------------------------
const JWT_SECRET = process.env.JWT_SECRET || "super-james-random-secret-key"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m"
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d"

// # ----------------------------------
// # Security
// # ----------------------------------
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || "12"

// # ----------------------------------
// # 2FA
// # ----------------------------------
const TWO_FA_ISSUER = process.env.TWO_FA_ISSUER || "CIYO_SQL_SERVICE"

// # ----------------------------------
// # Rate Limiting (Gateway)
// # ----------------------------------
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || "100"
const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW || "15"

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_URL = process.env.REDIS_URL;

console.log(`✅ Loaded env file: ${envFile}`, SERVICE_NAME, PORT, NODE_ENV);


module.exports = {
  NODE_ENV,
  PORT,
  INTERNAL_SERVICE_SECRET,
  API_GATEWAY_MICROSERVICE_URL,
  SQL_MICROSERVICE_URL,
  MONGO_MICROSERVICE_URL,
  AI_MICROSERVICE_URL,
  WEBSOCKET_MICROSERVICE_URL,
  CRON_MICROSERVICE_URL,
  PAYMENT_MICROSERVICE_URL,
  MAIL_MICROSERVICE_URL,
  SERVICE_NAME,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
  TWO_FA_ISSUER,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_URL,
  API_GATEWAY_MICROSERVICE_PORT,
  SQL_MICROSERVICE_PORT,
  MONGO_MICROSERVICE_PORT,
  AI_MICROSERVICE_PORT,
  WEBSOCKET_MICROSERVICE_PORT,
  CRON_MICROSERVICE_PORT,
  PAYMENT_SERVICE_PORT,
  MAIL_SERVICE_PORT,
  NOTIFICATION_SERVICE_PORT
};

