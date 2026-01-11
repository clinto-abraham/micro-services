const { monitorEventLoopDelay } = require("perf_hooks");

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

const check = () => {
  const lagMs = Math.round(h.mean / 1e6);
  return {
    status: lagMs > 200 ? "DOWN" : "UP",
    lagMs
  };
};

module.exports = { check };
