// "use strict";

// // const serviceHealth = require("../health/serviceHealth.store");

// "use strict";

// /**
//  * Central in-memory health store
//  * Shared across the application
//  * DO NOT reassign this object
//  */
// const serviceHealth = {
//   "mongo-service": {
//     up: true,
//     lastChecked: null,
//     error: null
//   },
//   redis: {
//     up: false,
//     lastChecked: null,
//     error: null
//   },
//   // add more services here
// };



// module.exports = serviceKey => (req, res, next) => {
//   const status = serviceHealth[serviceKey];

//   if (!status || !status.up) {
//     return res.status(503).json({
//       success: false,
//       error: `${serviceKey}_UNAVAILABLE`
//     });
//   }

//   next();
// };
