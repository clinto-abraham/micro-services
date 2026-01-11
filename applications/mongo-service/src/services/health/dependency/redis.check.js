const redis = require("../../../db/redis");

module.exports = async () => {
  try {
    await redis.ping();
    return { name: "redis", status: "UP" };
  } catch (err) {
    return { name: "redis", status: "DOWN", error: err.message };
  }
};
