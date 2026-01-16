"use strict";

const axios = require("axios");

const checkGemini = async () => {
  try {
    await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: "ping" }] }]
      },
      { timeout: 3000 }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkGemini };
