"use strict";

module.exports = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map(d => d.message)
      });
    }

    // Replace request payload with validated & sanitized data
    req[property] = value;
    next();
  };
};
