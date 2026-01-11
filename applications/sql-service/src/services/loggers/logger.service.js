"use strict";

const consoleSink = require("./sinks/console.sink");
// future: mongoSink, postgresSink

const sinks = [
  consoleSink
  // mongoSink,
  // postgresSink
];

const log = async (entry) => {
  for (const sink of sinks) {
    try {
      await sink.write(entry);
    } catch (err) {
      console.error("Logger sink failed:", err.message);
    }
  }
};

module.exports = {
  log
};
