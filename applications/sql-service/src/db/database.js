"use strict";

const logger = require("../utils/logger.util");
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = require("../configs/env");

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

module.exports = {
  development: {
    ...common,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: logger.warn, // show SQL in dev (optional)
  },

  test: {
    ...common,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: logger.info, 
  },

  stage: {
    ...common,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: logger.debug, 
  },

  production: {
    ...common,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false, // disable logs in production
  },
};

