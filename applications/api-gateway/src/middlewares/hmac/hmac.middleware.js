"use strict";

const crypto = require("crypto");

module.exports = function hmacSigner(req, res, next) {
   console.log("👉 entering hmac");
  const timestamp = Date.now().toString();
  const body = JSON.stringify(req.body || {});

  const signature = crypto
    .createHmac("sha256", process.env.INTERNAL_HMAC_SECRET)
    .update(body + timestamp)
    .digest("hex");

  req.headers["x-hmac-signature"] = signature;
  req.headers["x-hmac-timestamp"] = timestamp;
  console.log("👉 exiting hmac");

  next();
};
