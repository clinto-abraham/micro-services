"use strict";

const response = require("../../helpers/response");

module.exports = (schema) => {
  return (req, res, next) => {
    // validate body, params, query depending on schema type
    const data = req.body;

    const { error, value } = schema.validate(data, {
      abortEarly: false,  // return all validation errors
      allowUnknown: false // block extra fields
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      return response.error(res, "Validation failed", 400, errors);
    }

    // replace body with sanitized values
    req.body = value;

    next();
  };
};
