"use strict";

module.exports = (req, res, next) => {
  const token = req.headers["x-health-token"];
  const expected = process.env.HEALTH_TOKEN;

  if (!expected) return next(); // auth disabled

  if (token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
