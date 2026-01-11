"use strict";

/**
 * Normalize one micro-service health response
 * This function assumes the canonical contract
 */

const normalizeHealth = (serviceName, payload, latencyMs) => {
  // HARD FAIL if mandatory fields are missing
  if (
    !payload ||
    !payload.live ||
    !payload.ready ||
    !payload.live.status ||
    !payload.ready.status
  ) {
    return {
      service: serviceName,
      status: "DOWN",
      reason: "INVALID_HEALTH_RESPONSE"
    };
  }

  const liveStatus = payload.live.status;
  const readyStatus = payload.ready.status;

  let status = "UP";

  if (liveStatus !== "UP") {
    status = "DOWN";
  } else if (readyStatus !== "UP") {
    status = "DEGRADED";
  }

  return {
    service: serviceName,
    status,
    state: payload.state,
    live: liveStatus,
    ready: readyStatus,
    latencyMs,

    pid: payload.live.process?.pid ?? null,
    uptimeSec: payload.live.process?.uptimeSec ?? null,
    heapUsedMB: payload.live.process?.memory?.heapUsedMB ?? null,
    rssMB: payload.live.process?.memory?.rssMB ?? null,
    eventLoopLagMs: payload.live.eventLoop?.lagMs ?? null,

    dependencies: (payload.ready.dependencies || []).reduce(
      (acc, dep) => {
        acc[dep.name] = dep.status;
        return acc;
      },
      {}
    )
  };
};

module.exports = {
  normalizeHealth
};







// "use strict";

// const normalize = ({ name, response, latencyMs }) => {
//   // HARD FAIL if structure is invalid
//   if (
//     !response ||
//     !response.live ||
//     !response.ready ||
//     !response.live.status ||
//     !response.ready.status
//   ) {
//     return {
//       service: name,
//       status: "DOWN",
//       reason: "INVALID_HEALTH_CONTRACT"
//     };
//   }

//   const live = response.live.status;
//   const ready = response.ready.status;

//   let status = "UP";

//   if (live !== "UP") status = "DOWN";
//   else if (ready !== "UP") status = "DEGRADED";

//   return {
//     service: name,
//     status,
//     live,
//     ready,
//     latencyMs,
//     eventLoopLagMs: response.live.eventLoop?.lagMs ?? null,
//     heapUsedMB: response.live.process?.memory?.heapUsedMB ?? null,
//     dependencies: (response.ready.dependencies || []).reduce(
//       (acc, d) => {
//         acc[d.name] = d.status;
//         return acc;
//       },
//       {}
//     )
//   };
// };

// module.exports = {
//   normalize
// };
