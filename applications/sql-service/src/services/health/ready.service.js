"use strict";

const dependencyChecks = require("./dependency");
const { deriveStatus } = require("./status.util");

const check = async () => {
  const dependencies = await dependencyChecks.checkAll();
  const status = deriveStatus(dependencies);

  return {
    status,
    dependencies
  };
};

module.exports = {
  check
};

