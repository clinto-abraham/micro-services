const crypto = require("crypto");

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000; // 5 minutes

module.exports = (redis) => {
  return async (req, res, next) => {
    try {
      const metadata = req.body?.metadata;
      // if (!metadata) {
      //   return res.status(400).json({
      //     errorCode: "MISSING_METADATA",
      //     message: "Request metadata is required"
      //   });
      // }

  
      const requestId = req.context?.requestId
      const timestamp = req.context?.timestamp

      console.log(req.headers, 16)
      console.log(req.context, 21, "req.context")

      // const { timestamp } = metadata;

      if (!requestId || !timestamp) {
        return res.status(400).json({
          errorCode: "INVALID_METADATA",
          message: "requestId and timestamp are required"
        });
      }

      const requestTime = new Date(timestamp).getTime();
      const now = Date.now();

      if (isNaN(requestTime)) {
        return res.status(400).json({
          errorCode: "INVALID_TIMESTAMP",
          message: "Invalid timestamp format"
        });
      }

      if (Math.abs(now - requestTime) > MAX_CLOCK_SKEW_MS) {
        return res.status(401).json({
          errorCode: "REPLAY_DETECTED",
          message: "Request timestamp outside allowed window"
        });
      }

      // Replay key = hash of requestId
      const replayKey = `replay:${crypto
        .createHash("sha256")
        .update(requestId)
        .digest("hex")}`;

      const alreadySeen = await redis.get(replayKey);
      if (alreadySeen) {
        return res.status(409).json({
          errorCode: "REPLAY_DETECTED",
          message: "Duplicate request detected"
        });
      }

      // Store replay key with TTL
      await redis.set(replayKey, "1", "PX", MAX_CLOCK_SKEW_MS);

      next();
    } catch (err) {
      next(err);
    }
  };
};


// // middlewares/replayProtection.js
// const response = require("../utils/response");

// module.exports = (redis) => async (req, res, next) => {
//   const { timestamp, requestId } = req.body;

//   const now = Date.now();
//   const ts = new Date(timestamp).getTime();

//   if (Math.abs(now - ts) > 5 * 60 * 1000) {
//     return res.status(401).json(
//       response.error({
//         errorCode: "REPLAY_DETECTED",
//         message: "Request expired",
//         requestId
//       })
//     );
//   }

//   const nonceKey = `nonce:${requestId}`;
//   const exists = await redis.get(nonceKey);

//   if (exists) {
//     return res.status(409).json(
//       response.error({
//         errorCode: "REPLAY_DETECTED",
//         message: "Duplicate request",
//         requestId
//       })
//     );
//   }

//   await redis.setex(nonceKey, 300, "1");
//   next();
// };
