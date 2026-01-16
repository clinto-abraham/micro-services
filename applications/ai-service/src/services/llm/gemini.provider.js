"use strict";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiConfig = require("../../configs/gemini.config");
const env = require("../../configs/env");

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

exports.chat = async (prompt) => {
  const model = genAI.getGenerativeModel({
    model: geminiConfig.model,
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: geminiConfig.temperature,
      maxOutputTokens: geminiConfig.maxOutputTokens
    }
  });

  const response = result.response.text();

  return {
    provider: "gemini",
    model: geminiConfig.model,
    output: response
  };
};
