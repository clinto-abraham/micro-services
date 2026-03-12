'use strict';

module.exports = function internalAuth(req, res, next) {
  const expected = process.env.INTERNAL_SERVICE_SECRET;
  if (!expected) return next(); // disabled if not set

  const got =
    req.headers['x-internal-secret'] ||
    req.headers['x-internal-secret'.toLowerCase()] ||
    req.headers['x-internal-secret'.toUpperCase()];

  if (got !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};

