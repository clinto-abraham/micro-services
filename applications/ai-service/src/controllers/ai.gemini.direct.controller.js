"use strict";

const aiService = require("../services/ai/ai.single.service");

exports.chat = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await aiService.run(prompt, "gemini");

    res.json({
      success: true,
      provider: result.provider,
      response: result.response
    });
  } catch (err) {
    next(err);
  }
};
