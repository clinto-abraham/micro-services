"use strict";

const { errorResponse } = require("../../utils/response.util");

module.exports = function validateSchema(schema) {
  return (req, res, next) => {
     console.log("👉 entering schema middleware");
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json(
        errorResponse({
          success: false,
          message: "Invalid request payload",
          errorCode: "INVALID_SCHEMA",
          statusCode: 400,
          requestId: req.context.requestId
        })
      );
    }

    // sanitized payload
    req.body = value;
    console.log("👉 exiting schema middleware");
    next();
  };
};
