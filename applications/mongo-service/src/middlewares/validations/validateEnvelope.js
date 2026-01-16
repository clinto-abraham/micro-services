// middlewares/validateEnvelope.js
const response = require("../utils/response");
const ERRORS = require("../../constants/errorCodes");

module.exports = (req, res, next) => {
  const {
    payload,
    // requestId,
    // ip,
    // userAgent,
    // deviceId,
    // route,
    // timestamp
  } = req.body || {};

  if (
    !payload 
    // !requestId ||
    // !ip ||
    // !userAgent ||
    // !deviceId ||
    // !route ||
    // !timestamp
  ) {
    return res.status(400).json(
      response.error({
        errorCode: ERRORS.INVALID_PAYLOAD,
        message: "Invalid request envelope",
        requestId: requestId || "unknown"
      })
    );
  }

  next();
};
