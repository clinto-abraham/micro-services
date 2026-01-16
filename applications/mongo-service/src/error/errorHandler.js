"use strict";

const ApiError = require("./ApiError");
const ERROR_CODES = require("./errorCodes");

/**
 * Express global error handler
 * MUST be the last middleware
 */
module.exports = (err, req, res, next) => {
  // Default values
  let status = 500;
  let code = ERROR_CODES.INTERNAL_ERROR;
  let message = "Something went wrong";
  let details = undefined;

  /**
   * 1. Custom ApiError (our own errors)
   */
  if (err instanceof ApiError) {
    status = err.status;
    code = err.code;
    message = err.message;
  }

  /**
   * 2. Joi validation error
   */
  else if (err.isJoi) {
    status = 400;
    code = ERROR_CODES.VALIDATION_ERROR;
    message = "Invalid request data";
    details = err.details?.map(d => d.message);
  }

  /**
   * 3. Mongo / Mongoose errors
   */
  else if (err.name === "CastError") {
    status = 400;
    code = ERROR_CODES.VALIDATION_ERROR;
    message = "Invalid ID format";
  }

  else if (err.code === 11000) {
    status = 409;
    code = ERROR_CODES.VALIDATION_ERROR;
    message = "Duplicate record exists";
  }

  /**
   * 4. API key mismatch
   */
  else if (err.code === ERROR_CODES.API_KEY_INVALID) {
    status = 401;
    code = ERROR_CODES.API_KEY_INVALID;
    message = "Invalid API key";
  }

  /**
   * 5. Fallback for unknown errors
   */
  else {
    console.error("❌ Unhandled error:", err);
  }

  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(details && { details })
    }
  });
};
