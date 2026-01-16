const processService = require("./process.service");
const eventLoopService = require("./eventLoop.service");

const check = async ({ startTime }) => {
  const process = await processService.check(startTime);
  const eventLoop = eventLoopService.check();

  const status =
    eventLoop.status === "DOWN" ? "DOWN" : "UP";

  return {
    status,
    process,
    eventLoop
  };
};

module.exports = {
  check
};
