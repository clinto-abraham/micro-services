"use strict";

module.exports = (req, _res, next) => {
  req.enableIdempotency = true;
  next();
};
