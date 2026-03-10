'use strict';

const crypto = require('crypto');

const hmacSigner = (req, res, next) => {
  console.log('hmac secret print', process.env.INTERNAL_HMAC_SECRET);
  const secret = process.env.INTERNAL_HMAC_SECRET || 'todayIsDone-our_test_hmac';

  if (!secret) {
    console.error('❌ HMAC_SECRET missing in api-gateway');

    return res.status(500).json({
      success: false,
      errorCode: 'GATEWAY_MISCONFIGURED',
      message: 'HMAC secret not configured',
    });
  }

  try {
    const body = req.body ? JSON.stringify(req.body) : '';

    const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

    req.hmacSignature = signature;
    next();
  } catch (err) {
    console.error('❌ HMAC signing failed:', err.message);
    next(err);
  }
};

module.exports = {
  hmacSigner,
};

// "use strict";

// const crypto = require("crypto");

// module.exports = function hmacSigner(req, res, next) {
//    console.log("👉 entering hmac");
//   const timestamp = Date.now().toString();
//   const body = JSON.stringify(req.body || {});

//   const signature = crypto
//     .createHmac("sha256", process.env.INTERNAL_HMAC_SECRET)
//     .update(body + timestamp)
//     .digest("hex");

//   req.headers["x-hmac-signature"] = signature;
//   req.headers["x-hmac-timestamp"] = timestamp;
//   console.log("👉 exiting hmac");

//   next();
// };
