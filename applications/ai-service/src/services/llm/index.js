"use strict";

module.exports = {
  openai: require("./openai.provider"),
  gemini: require("./gemini.provider"),
  local: require("./local.provider")
};

