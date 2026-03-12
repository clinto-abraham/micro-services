"use strict";

const logger = require("../utils/logger.util");
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = require("../configs/env");

// Fallback DB names when .env file is missing or DB_NAME not set (e.g. no .env.production)
const DEFAULT_DB_NAMES = {
  development: "database_development",
  test: "database_test",
  stage: "database_stage",
  production: "database_production",
};

const common = {
  host: DB_HOST || "127.0.0.1",
  dialect: "postgres",
  port: DB_PORT,

  pool: {
    max: 5,               // max 5 connections, good for low traffic
    min: 0,               // no persistent connections if idle
    acquire: 30000,       // wait up to 30s to get a connection
    idle: 5 * 60 * 1000,    // keep idle for 5 min before auto release
    evict: 6 * 60 * 1000,   // remove idle first after 6 min
  }
};

function getDatabase(env) {
  return DB_NAME || DEFAULT_DB_NAMES[env] || DEFAULT_DB_NAMES.development;
}

module.exports = {
  development: {
    ...common,
    username: DB_USER,
    user: DB_USER,
    password: DB_PASSWORD,
    database: getDatabase("development"),
    logging: logger.warn, // show SQL in dev (optional)
  },

  test: {
    ...common,
    username: DB_USER,
    user: DB_USER,
    password: DB_PASSWORD,
    database: getDatabase("test"),
    logging: logger.info,
  },

  stage: {
    ...common,
    username: DB_USER,
    user: DB_USER,
    password: DB_PASSWORD,
    database: getDatabase("stage"),
    logging: logger.debug,
  },

  production: {
    ...common,
    username: DB_USER,
    user: DB_USER,
    password: DB_PASSWORD,
    database: getDatabase("production"),
    logging: false, // disable logs in production
  },
};

