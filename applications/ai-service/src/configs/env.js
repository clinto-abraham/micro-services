"use strict";

const path = require("path");
const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV || "production";
const envFile = `.env.${NODE_ENV}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

// # ----------------------------------
// # App
// # ----------------------------------

const PORT = process.env.PORT || 3000;
const SERVICE_NAME   = process.env.SERVICE_NAME || "ai-service"

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
const TWO_FA_ISSUER  = process.env.TWO_FA_ISSUER || "CIYO_SQL_SERVICE"

// # ----------------------------------
// # Rate Limiting (Gateway)
// # ----------------------------------
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || "100"
const RATE_LIMIT_WINDOW  = process.env.RATE_LIMIT_WINDOW || "15"

// # ----------------------------------
// # REDIS 
// # ----------------------------------

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT =  Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
const REDIS_DB = Number(process.env.REDIS_DB) || 1;

const INTERNAL_JWT_SECRET =  process.env.INTERNAL_JWT_SECRET;
const OPENAI_API_KEY =  process.env.OPENAI_API_KEY;

const API_GATEWAY_MICROSERVICE_URL= process.env.API_GATEWAY_MICROSERVICE_URL || "http://localhost:2000"
const SQL_MICROSERVICE_URL= process.env.SQL_MICROSERVICE_URL || "http://localhost:3000"
const MONGO_MICROSERVICE_URL=process.env.MONGO_MICROSERVICE_URL || "http://localhost:4444"
const AI_MICROSERVICE_URL=process.env.AI_MICROSERVICE_URL || "http://localhost:5000"
const WEBSOCKET_MICROSERVICE_URL=process.env.WEBSOCKET_MICROSERVICE_URL || "http://localhost:6000"
const CRON_MICROSERVICE_URL=process.env.CRON_MICROSERVICE_URL || "http://localhost:7000"
const PAYMENT_SERVICE_URL=process.env.PAYMENT_SERVICE_URL || "http://localhost:8000"
const MAIL_SERVICE_URL=process.env.MAIL_SERVICE_URL || "http://localhost:9000"

console.log(`
🚀 Service Bootstrapped Successfully
────────────────────────────────────
🔹 Service Name   : ${SERVICE_NAME}
🔹 Environment    : ${NODE_ENV}
🔹 Port           : ${PORT}
🔹 Env File       : ${envFile}
🔹 PID            : ${process.pid}
🔹 Timestamp      : ${new Date().toISOString()}
────────────────────────────────────
`);

console.log("🔑 GEMINI KEY PRESENT:", !!process.env.GEMINI_API_KEY);

module.exports = {
  NODE_ENV,
  PORT,
  API_GATEWAY_MICROSERVICE_URL,
  SQL_MICROSERVICE_URL,
  MONGO_MICROSERVICE_URL,
  AI_MICROSERVICE_URL,
  WEBSOCKET_MICROSERVICE_URL,
  CRON_MICROSERVICE_URL,
  PAYMENT_SERVICE_URL,
  MAIL_SERVICE_URL,
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
  REDIS_DB,
  INTERNAL_JWT_SECRET,
  OPENAI_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};



