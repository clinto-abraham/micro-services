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
const NODE_ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 3000;
const SERVICE_NAME   = process.env.SERVICE_NAME || "sql-service"

// # ----------------------------------
// # REDIS
// # ----------------------------------
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_URL = process.env.REDIS_URL;
const REDIS_DB = process.env.REDIS_DB;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
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
// # Internal service auth (Gateway → Service)
// # ----------------------------------
const INTERNAL_SERVICE_SECRET = process.env.INTERNAL_SERVICE_SECRET;


console.log(`✅ Loaded env file: ${envFile}`, SERVICE_NAME,  PORT,NODE_ENV);


module.exports = {
  NODE_ENV,
  PORT,
  SERVICE_NAME,
  INTERNAL_SERVICE_SECRET,
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
  REDIS_URL,
  REDIS_DB,
  REDIS_PASSWORD,
};










