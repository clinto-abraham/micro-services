const ERRORS = require("../constants/errors");

module.exports = (res, errorKey, overrides = {}) => {
  const err = ERRORS[errorKey] || ERRORS.INTERNAL_ERROR;

  return res.status(err.statusCode).json({
    ...err,
    ...overrides
  });
};
