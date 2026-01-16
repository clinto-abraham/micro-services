"use strict";

class ApiError extends Error {
  constructor({ status = 500, code, message }) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

module.exports = ApiError;
