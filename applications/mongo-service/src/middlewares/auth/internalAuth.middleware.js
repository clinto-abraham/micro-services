"use strict";

module.exports = function internalAuth(req, res, next) {
  const secret = req.headers["x-internal-secret"];
  console.log(process.env.INTERNAL_SERVICE_SECRET, 5)
  console.log(secret, 6)

  if (!secret || secret !== process.env.INTERNAL_SERVICE_SECRET) {
    return res.status(403).json({
      success: false,
      errorCode: "FORBIDDEN_INTERNAL_CALL",
      message: "Direct access to service is not allowed"
    });
  }

  next();
};
