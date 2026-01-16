"use strict";

// Simple in-memory sliding-window spike detector (per IP)
// Not persistent; for production use redis-based counters

// const WINDOW_MS = 3000;
// const MAX_REQS = 30;
// const map = new Map();

// module.exports = (req, res, next) => {
//   try {
//     const ip = req.ip || req.connection.remoteAddress || "unknown";
//     const now = Date.now();
//     const arr = map.get(ip) || [];
//     arr.push(now);
//     // keep only last WINDOW_MS
//     const filtered = arr.filter(t => now - t <= WINDOW_MS);
//     map.set(ip, filtered);
//     if (filtered.length > MAX_REQS) {
//       return res.status(429).json({ error: "Spike detected" });
//     }
//     next();
//   } catch (e) {
//     next();
//   }
// };


const WINDOW_MS = 1000; // 1 second
const MAX_REQUESTS = 20;

const ipHits = new Map();

setInterval(() => ipHits.clear(), WINDOW_MS);

module.exports = (req, res, next) => {
  const ip = req.ip;
  const hits = (ipHits.get(ip) || 0) + 1;

  ipHits.set(ip, hits);

  if (hits > MAX_REQUESTS) {
    return res.status(429).json({
      message: "Traffic spike detected. Slow down."
    });
  }

  next();
};
