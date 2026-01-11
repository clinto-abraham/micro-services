"use strict";
const { initRedis } = require("../redis/redis.client");

const { queue } = initRedis();

module.exports = {
  connection: queue
};

