"use strict";

const providers = require("./llm");
const aiConfig = require("../configs/ai.config");

exports.process = async ({ prompt, provider }) => {
  const selectedProvider =
    provider || aiConfig.defaultProvider;

  if (!providers[selectedProvider]) {
    throw new Error(`Unsupported AI provider: ${selectedProvider}`);
  }

  return providers[selectedProvider].chat(prompt);
};



// const providers = require("./llm");
// const config = require("../configs/ai.config");
// const events = require("./event.service");

// exports.process = async ({ prompt, userId }) => {
//   const provider = providers[config.defaultProvider];
//   const response = await provider.chat(prompt);

//   await events.emit("AI_COMPLETED", {
//     userId,
//     response
//   });

//   return response;
// };
