"use strict";

const { INTERNAL_SERVICE_SECRET } = require("../../configs/env");

module.exports = (req, res, next) => {
  req.headers["x-internal-secret"] =
    INTERNAL_SERVICE_SECRET || process.env.INTERNAL_SERVICE_SECRET;
  next();
};

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// module.exports = (req, res, next) => {
//   const token = req.headers["x-internal-token"];
//   if (!token) return res.status(401).json({ error: "Missing internal token" });
//   try {
//     jwt.verify(token, process.env.SERVICE_JWT_SECRET);
//     next();
//   } catch (e) {
//     res.status(403).json({ error: "Invalid internal token" });
//   }
// };