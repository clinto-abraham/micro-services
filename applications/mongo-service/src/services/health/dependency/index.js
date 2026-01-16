const pingDB = require("./db.health.check");
const checkRedis = require("./redis.check");
const checkMail = require("./mail.check");
const { withTimeout } = require("../timeout.util");

const safe = (fn, name) => {
  if (typeof fn !== "function") {
    return Promise.resolve({
      name,
      status: "SKIPPED"
    });
  }

  return withTimeout(fn(), 2000, name).catch(err => ({
    name,
    status: "DOWN",
    error: err.message
  }));
};

const checkAll = async () =>
  Promise.all([
    safe(pingDB, "database"),
    safe(checkRedis, "redis"),
    safe(checkMail, "mail")
  ]);

module.exports = { checkAll };
