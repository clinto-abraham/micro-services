"use strict";

/**
 * Postgres schema sync — applies Sequelize models to the DB (CREATE/ALTER tables).
 * Run only when you add or change models: npm run pg-sync
 * Uses NODE_ENV to load .env.development / .env.test / .env.production (via configs/env).
 */

require("../configs/env");

const db = require("../models");

async function run() {
  await db.sequelize.authenticate();
  await db.sequelize.sync({ alter: true });
  console.log("Postgres sync done.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Postgres sync failed:", err);
  process.exit(1);
});
