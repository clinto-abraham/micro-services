const dependency = require("./dependency");
const { deriveStatus } = require("./status.util");

const check = async () => {
  const dependencies = await dependency.checkAll();
  const status = deriveStatus(dependencies);

  return { status, dependencies };
};

module.exports = { check };
