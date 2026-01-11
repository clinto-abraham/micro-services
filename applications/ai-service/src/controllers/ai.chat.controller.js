"use strict";

const aiQueue = require("../queues/ai.queue");

exports.chat = async (req, res, next) => {
  try {
    const { prompt, mode, providers } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const job = await aiQueue.add("chat", {
      prompt,
      mode: mode || "single",        // single | compare | multi
      providers: providers || [],    // ["gemini", "openai"]
      userId: req.headers["x-user-id"]
    });

    res.json({
      success: true,
      jobId: job.id
    });
  } catch (err) {
    next(err);
  }
};
