"use strict";

const path = require("path");
const dotenv = require("dotenv");
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

const PORT = process.env.PORT || 3000;
const SERVICE_NAME   = process.env.SERVICE_NAME || "sql-service"
const SQL_SERVICE_BASE_URL = process.env.SQL_SERVICE_BASE_URL || "http://localhost:3000/postgres"
const MONGO_SERVICE_BASE_URL = process.env.MONGO_SERVICE_BASE_URL || "http://localhost:1111/mongodb"

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
const REDIS_DB = Number(process.env.REDIS_DB) || 4;


const INTERNAL_JWT_SECRET =  process.env.INTERNAL_JWT_SECRET;
const OPENAI_API_KEY =  process.env.OPENAI_API_KEY;

const WS_PORT =  process.env.WS_PORT;
const WS_SECRET =  process.env.WS_SECRET;
const REDIS_URL = process.env.REDIS_URL || "redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379"

console.log(`✅ Loaded env file: ${envFile}`, SERVICE_NAME,  PORT);

module.exports = {
  PORT,
  WS_PORT,
  WS_SECRET,
  SQL_SERVICE_BASE_URL,
  MONGO_SERVICE_BASE_URL,
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
  REDIS_URL


};
