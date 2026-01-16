"use strict";

const WARMUP_MS = 30_000; // 30 seconds

const serviceStartedAt = Date.now();

const getState = () => {
  if (Date.now() - serviceStartedAt < WARMUP_MS) {
    return "STARTING";
  }
  return "READY";
};

module.exports = {
  getState
};
