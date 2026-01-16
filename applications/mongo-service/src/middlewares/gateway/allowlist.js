// middlewares/allowlist.js
const ipRangeCheck = require("ip-range-check");
// const response = require("../utils/response");

module.exports = (req, res, next) => {
  console.log("allowedList")
  if (process.env.ALLOWLIST_ENABLED !== "true") {
    return next();
  }

  const allowedRanges = (process.env.ALLOWED_IPS || "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

    const rawIp =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  console.log("ALLOWLIST CHECK:", {
    rawIp,
    reqIp: req.ip
  });

  if (allowedRanges.length === 0) {
    return next(); // fail-open if misconfigured
  }

  // Correct IP extraction (gateway / proxy safe)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  if (!ip || !ipRangeCheck(ip, allowedRanges)) {
    return res.status(403).json(
{
        errorCode: "FORBIDDEN",
        message: "Source IP not allowed",
        requestId: req.body?.requestId
      }
    );
  }

  next();
};
