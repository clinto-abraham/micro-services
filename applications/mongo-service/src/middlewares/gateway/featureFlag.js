// middlewares/featureFlag.js
// const response = require("../utils/response");
const featureFlagService = require("../../services/utils/featureFlag.service");
// const sendResponse = require("../utils/sendResponse");

module.exports = (flagKey, redis) => async (req, res, next) => {
  const enabled = await featureFlagService.isEnabled(flagKey, redis);

  if (!enabled) {


    // return sendResponse({
    //       res,
    //       result: {
    //         success: false,
    //         statusCode: 500,
    //         errorCode: "INTERNAL_ERROR",
    //         message: "Internal server error"
    //       }
    //     });

    return res.status(503).json(
      {
        errorCode: "FEATURE_DISABLED",
        message: "This feature is temporarily disabled",
        requestId: req.body?.requestId
      }


    );
  }

  next();
};
