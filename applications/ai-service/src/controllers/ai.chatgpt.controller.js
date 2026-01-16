"use strict";

const aiQueue = require("../queues/ai.queue");

exports.chat = async (req, res, next) => {
  try {
    const job = await aiQueue.add("chat", {
      prompt: req.body.prompt,
      provider: "openai",
      userId: req.headers["x-user-id"]
    });

    res.json({ success: true, jobId: job.id });
  } catch (e) {
    next(e);
  }
};
