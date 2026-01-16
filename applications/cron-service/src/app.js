"use strict";
const express = require("express");
const routes = require("./routes");
const createRedisClient = require("./configs/redis.config");

const cron = require('node-cron');
const axios = require("./utils/axios");

const app = express();
app.use(express.json());

app.use("/cron", routes);

createRedisClient();
// Warm seats cache every minute
cron.schedule("0 */12 * * *", async () => {
  try {
    console.log("[cron] warming seats cache");
    await axios.get(`${process.env.SQL_MICROSERVICE_URL}/seats`, { timeout: 10000 });
  } catch (e) {
    console.error("[cron] warm error:", e.message);
  }
});

// Example maintenance: expire unpaid reserved tickets - placeholder
cron.schedule("0 */12 * * *", async () => {
  try {
    console.log("[cron] maintenance tick");
    // call internal endpoints or run DB cleanup
  } catch (e) {
    console.error("[cron] maintenance error:", e.message);
  }
});


// 0 → at minute 0

// */12 → every 12th hour

// * → any day

// * → any month

// * → any day of week


module.exports = app;


