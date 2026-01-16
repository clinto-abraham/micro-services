const processService = require("./process.service");
const eventLoopService = require("./eventLoop.service");

const check = async ({ startTime }) => {
  const process = await processService.check(startTime);
  const eventLoop = eventLoopService.check();

  return {
    status: eventLoop.status === "DOWN" ? "DOWN" : "UP",
    process,
    eventLoop
  };
};

module.exports = { check };
