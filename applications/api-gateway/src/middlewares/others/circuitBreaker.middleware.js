// "use strict";

// const breakerFactory = require("../circuitBreaker/breaker");

// module.exports = serviceKey => {
//   const breaker = breakerFactory(serviceKey);

//   return (req, res, next) => {
//     if (!breaker.canRequest()) {
//       return res.status(503).json({
//         success: false,
//         error: `${serviceKey}_CIRCUIT_OPEN`
//       });
//     }

//     res.on("finish", () => {
//       if (res.statusCode >= 500) breaker.failure();
//       else breaker.success();
//     });

//     next();
//   };
// };
