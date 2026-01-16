"use strict";

const checkRedis = require("./redis.check");
const pingDB = require("./db.health.check");
// const checkMail = require("./mail.check"); // may be undefined

const { withTimeout } = require("./timeout.util");

const TIMEOUT = 2000;

/**
 * Safe executor:
 * - If fn is missing, mark dependency as SKIPPED
 */
const safe = (fn, name) => {
  if (typeof fn !== "function") {
    return Promise.resolve({
      name,
      status: "SKIPPED",
      reason: "CHECK_NOT_IMPLEMENTED"
    });
  }

  return withTimeout(fn(), TIMEOUT, name).catch(err => ({
    name,
    status: "DOWN",
    error: err.message
  }));
};

const checkAll = async () => {
  return Promise.all([
    safe(pingDB, "database"),
    safe(checkRedis, "redis"),
    safe(undefined, "mail") // 👈 explicit skip
  ]);
};

module.exports = {
  checkAll
};







// "use strict";
// const checkRedis = require("./redis.check");
// const checkMail = require("./mail.check");
// const { withTimeout } = require("./timeout.util");
// const pingDB = require("./db.health.check");

// const TIMEOUT = 2000;

// const safe = (fn, name) =>
//   withTimeout(fn(), TIMEOUT, name).catch(err => ({
//     name,
//     status: "DOWN",
//     error: err.message
//   }));

// const checkAll = async () => {
//   return Promise.all([
//     safe(pingDB, "database"),
//     safe(checkRedis, "redis"),
//     safe(checkMail, "mail")
//   ]);
// };

// module.exports = {
//   checkAll
// };


// const pingDB = require("./db.check");
// const checkRedis = require("./redis.check");
// const checkMail = require("./mail.check");

// const checkAll = async () => {
//   return Promise.all([
//     pingDB(),
//     checkRedis(),
//     checkMail()
//   ]);
// };

// module.exports = {
//   checkAll
// };
