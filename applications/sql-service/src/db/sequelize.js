"use strict";

const { Sequelize } = require('sequelize');
// const { PostgresDialect } = require("@sequelize/postgres");
const startPoolMonitor = require("./poolScaler"); // path to scaler
const dbConfig = require("./database.js")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize({
  // dialect: PostgresDialect,
  database: dbConfig.database,
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  ssl: true,
  // clientMinMessages: 'notice', // dialectOptions.clientMinMessages
  
});

// start dynamic pool scaling
startPoolMonitor(sequelize, {
  checkIntervalMs: 60 * 1000,
  highUseThreshold: 0.75,
  lowIdleThreshold: 0.80,
  maxLimit: 15,
  minLimit: 2,
  scaleStep: 2,
});

module.exports = sequelize;


// module.exports = { sequelize, postgresDatabaseConnectionCheck };


// "use strict";

// const { Sequelize } = require('@sequelize/core');
// const { PostgresDialect } = require('@sequelize/postgres');
// const logger = require("../utils/logger.util")

// let sequelize = null;
// let idleTimer = null;

// const IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

// function createSequelize() {
//   return new Sequelize({
//     dialect: PostgresDialect,
//     database: process.env.DB_NAME || 'database_development',
//     user: process.env.DB_USER || 'server-user',
//     password: process.env.DB_PASSWORD || 'server-user-clinto',
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 5432,
//     ssl: false,
//     logging: (sql) => logger.debug(sql),
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000,
//       acquire: 30000,
//     },
//   });
// }

// async function startDB() {
//   if (!sequelize) {
//     sequelize = createSequelize();
//   }

//   try {
//     await sequelize.authenticate();
//     logger.info("✅ Database connected");
//     resetIdleTimer();
//   } catch (err) {
//     logger.error("❌ Database connection failed", err);
//     throw err;
//   }

//   return sequelize;
// }


// async function stopDB() {
//   if (sequelize) {
//     try {
//       await sequelize.close();
//       logger.warn("⚠️ Database connection closed due to inactivity");
//       sequelize = null;
//     } catch (err) {
//       logger.error("❌ Error closing DB connection", err);
//     }
//   }
// }

// async function pingDB() {
//   try {
//     if (!sequelize) {
//     sequelize = createSequelize();
//     }
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     // You can start your application or sync models here
//     // await sequelize.sync(); 
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// function resetIdleTimer() {
//   if (idleTimer) {
//     clearTimeout(idleTimer);
//   }

//   idleTimer = setTimeout(async () => {
//     await stopDB();
//   }, IDLE_TIMEOUT_MS);
// }

// function getSequelize() {
//   return sequelize;
// }

// module.exports = {
//   startDB,
//   stopDB,
//   pingDB,
//   getSequelize,
//   resetIdleTimer,
//   sequelize
// };
