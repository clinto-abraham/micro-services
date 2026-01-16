"use strict";

module.exports = ({ res, result, requestId }) => {
  const statusCode =
    typeof result?.statusCode === "number"
      ? result.statusCode
      : result?.success === false
        ? 400
        : 200;

  return res.status(statusCode).json({
    success: result.success,
    errorCode: result.errorCode,
    statusCode: result.statusCode,
    message: result.message,
    data: result.data,
    meta: {
      requestId,
      ...(result.meta || {}),
      timestamp: result?.meta?.timestamp || new Date().toISOString()
    }
  });
};
