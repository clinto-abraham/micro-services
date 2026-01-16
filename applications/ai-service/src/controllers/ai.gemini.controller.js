"use strict";

const aiQueue = require("../queues/ai.queue");

exports.chat = async (req, res, next) => {
  try {
    console.log(req.body, "req.body")
    const job = await aiQueue.add("chat", {
      prompt: req.body.prompt,
      provider: "gemini",
      userId: req.headers["x-user-id"]
    });

    res.json({ success: true, jobId: job.id });
  } catch (e) {
    next(e);
  }
};
