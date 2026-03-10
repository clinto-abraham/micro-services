'use strict';

module.exports = (req, res, next) => {
  const receivedSecret = req.headers['x-internal-secret'];

  if (!receivedSecret) {
    return res.status(403).json({
      success: false,
      errorCode: 'FORBIDDEN_INTERNAL_CALL',
      message: 'Missing internal secret',
    });
  }

  if (receivedSecret !== process.env.INTERNAL_SERVICE_SECRET) {
    return res.status(403).json({
      success: false,
      errorCode: 'FORBIDDEN_INTERNAL_CALL',
      message: 'Invalid internal secret',
    });
  }

  next();
};
