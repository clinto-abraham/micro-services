"use strict";

const crypto = require("crypto");

module.exports = function deviceFingerprint(req, res, next) {
  console.log(req.context, 6)
  console.log("👉 entering fingerprint");

  const raw =
    req.context.ip +
    req.context.userAgent +
    (req.headers["x-device-id"] || "");

  const fingerprint = crypto
    .createHash("sha256")
    .update(raw)
    .digest("hex");

  req.context.deviceFingerprint = fingerprint;
  console.log("👉 exiting fingerprint");

  next();
};
