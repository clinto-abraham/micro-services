const deriveStatus = (deps) =>
  deps.some(d => d.status === "DOWN") ? "DOWN" : "UP";

module.exports = { deriveStatus };
