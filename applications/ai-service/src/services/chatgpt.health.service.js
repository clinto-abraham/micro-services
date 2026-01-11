"use strict";

const axios = require("axios");

const checkChatGPT = async () => {
  try {
    await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        timeout: 3000
      }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkChatGPT };
