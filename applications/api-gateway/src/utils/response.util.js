function successResponse({ message, data = {}, statusCode = 200, requestId }) {
  return {
    success: true,
    statusCode,
    message,
    data,
    meta: {
      requestId,
      timestamp: new Date().toISOString()
    }
  };
}

function errorResponse({ message, errorCode, statusCode = 500, requestId }) {
  return {
    success: false,
    statusCode,
    errorCode,
    message,
    meta: {
      requestId,
      timestamp: new Date().toISOString()
    }
  };
}

module.exports = {
  successResponse,
  errorResponse
};
