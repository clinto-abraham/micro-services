"use strict";

module.exports = function gatewayContext(req, res, next) {
  const encoded = req.headers["x-gateway-context"];

  if (!encoded) {
    return res.status(400).json({
      success: false,
      errorCode: "MISSING_GATEWAY_CONTEXT",
      message: "Gateway context header is required"
    });
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(encoded, "base64").toString("utf8")
    );

    req.context = decoded;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errorCode: "INVALID_GATEWAY_CONTEXT",
      message: "Malformed gateway context"
    });
  }
};
