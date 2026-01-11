"use strict";

const llm = require("../llm");

exports.run = async (prompt, providers = []) => {
  const results = await Promise.all(
    providers.map(async p => ({
      provider: p,
      response: await llm[p].chat(prompt)
    }))
  );

  return {
    prompt,
    results
  };
};
