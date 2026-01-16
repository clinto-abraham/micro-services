// const response = require("../utils/response");
const ERRORS = require("../constants/errorCodes");

module.exports = ({ envelopeSchema, payloadSchema }) => {
  return (req, res, next) => {
    // 1️⃣ Validate full request envelope
    const envelopeResult = envelopeSchema.validate(req.body, {
      abortEarly: true
    });

    if (envelopeResult.error) {
      return res.status(400).json(
        {
          errorCode: ERRORS.INVALID_PAYLOAD,
          message: envelopeResult.error.details[0].message,
          requestId: req.body?.requestId || "unknown"
        }
      );
    }

    // 2️⃣ Validate payload
    const payloadResult = payloadSchema.validate(req.body.payload, {
      abortEarly: true,
      stripUnknown: true
    });

    if (payloadResult.error) {
      return res.status(400).json(
{
          errorCode: ERRORS.INVALID_PAYLOAD,
          message: payloadResult.error.details[0].message,
          requestId: req.body.requestId
        }
      );
    }

    // Replace payload with validated version
    req.body.payload = payloadResult.value;

    next();
  };
};
