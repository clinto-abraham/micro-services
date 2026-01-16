const STARTED_AT = Date.now();
const WARMUP_MS = 30000;

const getState = () =>
  Date.now() - STARTED_AT < WARMUP_MS ? "STARTING" : "READY";

module.exports = { getState };
