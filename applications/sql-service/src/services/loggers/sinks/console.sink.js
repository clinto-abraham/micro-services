"use strict";

const write = async (entry) => {
  console.log(
    `[HTTP] ${entry.method} ${entry.path} → ${entry.statusCode} (${entry.responseTimeMs}ms)`
  );
};

module.exports = {
  write
};
