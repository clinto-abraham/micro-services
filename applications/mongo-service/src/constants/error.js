const ERRORS = {
  // ===== 400 =====
  MISSING_METADATA: {
    statusCode: 400,
    errorCode: "MISSING_METADATA",
    message: "Request metadata is required"
  },
  INVALID_METADATA: {
    statusCode: 400,
    errorCode: "INVALID_METADATA",
    message: "Invalid request metadata"
  },
  INVALID_TIMESTAMP: {
    statusCode: 400,
    errorCode: "INVALID_TIMESTAMP",
    message: "Invalid timestamp format"
  },

  // ===== 401 =====
  UNAUTHORIZED: {
    statusCode: 401,
    errorCode: "UNAUTHORIZED",
    message: "Unauthorized request"
  },
  REPLAY_DETECTED: {
    statusCode: 401,
    errorCode: "REPLAY_DETECTED",
    message: "Replay attack detected"
  },

  // ===== 403 =====
  ACCESS_DENIED: {
    statusCode: 403,
    errorCode: "ACCESS_DENIED",
    message: "Access denied"
  },
  INSUFFICIENT_ROLE: {
    statusCode: 403,
    errorCode: "INSUFFICIENT_ROLE",
    message: "Insufficient permissions"
  },

  // ===== 404 =====
  NOT_FOUND: {
    statusCode: 404,
    errorCode: "NOT_FOUND",
    message: "Resource not found"
  },

  // ===== 409 =====
  CONFLICT: {
    statusCode: 409,
    errorCode: "CONFLICT",
    message: "Resource conflict"
  },

  // ===== 422 =====
  VALIDATION_ERROR: {
    statusCode: 422,
    errorCode: "VALIDATION_ERROR",
    message: "Validation failed"
  },

  // ===== 429 =====
  RATE_LIMITED: {
    statusCode: 429,
    errorCode: "RATE_LIMITED",
    message: "Too many requests"
  },

  // ===== 500 =====
  INTERNAL_ERROR: {
    statusCode: 500,
    errorCode: "INTERNAL_ERROR",
    message: "Internal server error"
  }
};

module.exports = ERRORS;
