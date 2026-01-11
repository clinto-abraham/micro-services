"use strict";

const liveService = require("./live.service");
const readyService = require("./ready.service");
const warmupService = require("./warmup.service");

const check = async ({ startTime }) => {
  const state = warmupService.getState();
  const live = await liveService.check({ startTime });

  // During warmup, skip readiness
  const ready =
    state === "STARTING"
      ? { status: "STARTING", dependencies: [] }
      : await readyService.check();

  return {
    httpCode: ready.status === "UP" || state === "STARTING" ? 200 : 503,
    payload: {
      timestamp: new Date().toISOString(),
      state,
      live,
      ready
    }
  };
};

module.exports = {
  check
};



// const liveService = require("./live.service");
// const readyService = require("./ready.service");

// const check = async ({ startTime }) => {
//   const live = await liveService.check({ startTime });
//   const ready = await readyService.check({ startTime });

//   return {
//     httpCode: ready.status === "UP" ? 200 : 503,
//     payload: {
//       timestamp: new Date().toISOString(),
//       live,
//       ready
//     }
//   };
// };

// module.exports = {
//   check
// };
