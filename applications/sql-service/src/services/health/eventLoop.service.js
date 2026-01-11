const { monitorEventLoopDelay } = require("perf_hooks");

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

const check = () => {
  const mean = Math.round(h.mean / 1e6);

  return {
    status: mean > 200 ? "DOWN" : "UP",
    lagMs: mean
  };
};

module.exports = {
  check
};
