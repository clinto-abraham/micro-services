"use strict";

const redis = require("../../../db/redis");

module.exports = async () => {
  try {
    const res = await redis.ping();
    if (res !== "PONG") throw new Error("Invalid PING response");

    return {
      name: "redis",
      status: "UP"
    };
  } catch (err) {
    return {
      name: "redis",
      status: "DOWN",
      error: err.message
    };
  }
};


// const redis = require("../../db/redis");

// module.exports = async () => {
//   try {
//     await redis.ping();
//     return { name: "redis", status: "UP" };
//   } catch {
//     return { name: "redis", status: "DOWN" };
//   }
// };
