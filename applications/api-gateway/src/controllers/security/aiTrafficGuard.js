"use strict";

/**
 * ----------------------------------------
 * AI Traffic Guard
 * ----------------------------------------
 * 1. Blocks suspicious user-agents / headers
 * 2. Token-bucket throttling for AI endpoints
 */

/* -----------------------------
 * Suspicious client detection
 * ----------------------------- */
const suspiciousAgents = [
  "curl",
  "wget",
  "httpclient",
  "python",
  "scrapy"
  // ⚠️ do NOT block postman in dev
];

/* -----------------------------
 * Token bucket (AI protection)
 * ----------------------------- */
let bucket = 20;           // initial tokens
const MAX_BUCKET = 100;
const REFILL_RATE = 10;    // tokens per second

setInterval(() => {
  bucket = Math.min(bucket + REFILL_RATE, MAX_BUCKET);
}, 1000);

module.exports = (req, res, next) => {
  try {
    const path = req.path;
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    /* -----------------------------
     * Skip non-sensitive routes
     * ----------------------------- */
    if (
      path.startsWith("/health") ||
      path.startsWith("/docs") ||
      path.startsWith("/openapi.json")
    ) {
      return next();
    }

    /* -----------------------------
     * 1️⃣ Automated / bot detection
     * ----------------------------- */
    if (suspiciousAgents.some(agent => ua.includes(agent))) {
      return res.status(403).json({
        success: false,
        message: "Automated traffic blocked"
      });
    }

    // Browser sanity check
    if (!req.headers.accept || !req.headers["accept-language"]) {
      return res.status(403).json({
        success: false,
        message: "Suspicious client detected"
      });
    }

    /* -----------------------------
     * 2️⃣ AI token bucket guard
     * ----------------------------- */
    if (path.startsWith("/ai") || path.includes("/ask-ai")) {
      if (bucket <= 0) {
        return res.status(429).json({
          success: false,
          message: "AI overloaded. Please retry shortly."
        });
      }

      bucket--;
      res.setHeader("X-AI-Tokens-Remaining", bucket);
    }

    next();
  } catch (err) {
    next(err);
  }
};

