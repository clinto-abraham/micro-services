"use strict"
console.log("🔥 AI WORKER FILE LOADED");


const { Worker } = require("bullmq");
const { connection } = require("../configs/queue.config");
const orchestrator = require("../services/ai/ai.orchestrator");
const logger = require("../utils/logger");

new Worker("ai-jobs", async job => {
  const result = await orchestrator.handle(job.data);
  console.log("AI RESULT:", result);
  logger.info("AI job completed", {
  jobId: job.id,
  provider: result.provider,
  response: result.response
});

  return result;
}, { connection });

// new Worker("ai-jobs", processor, { connection });

