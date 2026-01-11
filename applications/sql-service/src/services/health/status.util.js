const deriveStatus = (items) =>
  items.some(i => i.status === "DOWN") ? "DOWN" : "UP";

module.exports = {
  deriveStatus
};
