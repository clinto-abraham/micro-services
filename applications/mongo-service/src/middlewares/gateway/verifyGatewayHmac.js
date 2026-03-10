'use strict';
const crypto = require('crypto');
const ERRORS = require('../../constants/errorCodes');

function canonicalize(obj) {
  if (!obj || typeof obj !== 'object') return '';

  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const signature = req.headers['x-signature'];
  const secret = process.env.INTERNAL_HMAC_SECRET;

  if (!secret) {
    throw new Error('INTERNAL_HMAC_SECRET is not defined');
  }

  if (!signature) {
    return res.status(401).json({
      errorCode: ERRORS.UNAUTHORIZED,
      message: 'Missing gateway signature',
      requestId: req.headers['x-request-id'],
    });
  }

  const expected = crypto.createHmac('sha256', secret).update(canonicalize(req.body)).digest('hex');

  if (signature !== expected) {
    return res.status(401).json({
      errorCode: ERRORS.UNAUTHORIZED,
      message: 'Invalid gateway signature',
      requestId: req.headers['x-request-id'],
    });
  }

  next();
};

// // middlewares/verifyGatewayHmac.js
// const crypto = require("crypto");
// // const response = require("../utils/response");
// const ERRORS = require("../../constants/errorCodes");

// module.exports = (req, res, next) => {
//   const signature = req.headers["x-gateway-signature"];
//   const secret = process.env.GATEWAY_SECRET || "some_new_secret";

//   // ✅ LOCAL / DEV BYPASS
//   if (process.env.NODE_ENV !== "production") {
//     return next();
//   }

//   if (!signature) {
//     return res.status(401).json(
// {
//         errorCode: ERRORS.UNAUTHORIZED,
//         message: "Missing gateway signature",
//         requestId: req.body?.requestId
//       }
//     );
//   }

//   const expected = crypto
//     .createHmac("sha256", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   if (signature !== expected) {
//     return res.status(401).json(
// {
//         errorCode: ERRORS.UNAUTHORIZED,
//         message: "Invalid gateway signature",
//         requestId: req.body?.requestId
//       }
//     );
//   }

//   next();
// };
