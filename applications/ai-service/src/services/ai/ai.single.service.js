"use strict";

const llm = require("../llm/index");
const aiConfig = require("../../configs/ai.config");

exports.run = async (prompt, provider) => {
  const selected = provider || aiConfig.defaultProvider;

  return {
    provider: selected,
    response: await llm[selected].chat(prompt)
  };
};

exports.runMultiple = async (prompt, providers = []) => {
  const tasks = providers.map(p => ({
    provider: p,
    response: llm[p].chat(prompt)
  }));

  return Promise.all(
    tasks.map(async t => ({
      provider: t.provider,
      response: await t.response
    }))
  );
};


exports.runDirect = async (prompt, provider) => {
  const selected = provider || aiConfig.defaultProvider;

  const response = await llm[selected].chat(prompt);

  return {
    provider: selected,
    response: response.output || response
  };
};
