const liveService = require("./live.service");
const readyService = require("./ready.service");
const warmupService = require("./warmup.service");
const { validateHealth } = require("../../validation");

const check = async ({ startTime }) => {
  const state = warmupService.getState();

  const live = await liveService.check({ startTime });
  const ready =
    state === "STARTING"
      ? { status: "STARTING", dependencies: [] }
      : await readyService.check();

  const payload = {
    timestamp: new Date().toISOString(),
    state,
    live,
    ready
  };

  const validation = validateHealth(payload);

  if (!validation.valid) {
    return {
      httpCode: 500,
      payload: { error: "INVALID_HEALTH_SCHEMA" }
    };
  }

  return {
    httpCode: ready.status === "UP" || state === "STARTING" ? 200 : 503,
    payload
  };
};

module.exports = { check };
