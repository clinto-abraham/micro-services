"use strict";

const providers = require("../llm");
const single = require("./ai.single.service");
const compare = require("./ai.compare.service");

exports.handle = async ({ prompt, mode, providers: selected }) => {
  switch (mode) {
    case "compare":
      return compare.run(prompt, selected);

    case "multi":
      return single.runMultiple(prompt, selected);

    default:
      return single.run(prompt, selected?.[0]);
  }
};
