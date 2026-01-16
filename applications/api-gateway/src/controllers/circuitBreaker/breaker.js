// "use strict";

// const breakers = require("./store");

// const FAILURE_THRESHOLD = 5;
// const RESET_TIMEOUT = 15000; // 15 sec

// module.exports = serviceKey => {
//   if (!breakers[serviceKey]) {
//     breakers[serviceKey] = {
//       failures: 0,
//       state: "CLOSED",
//       nextTry: null
//     };
//   }

//   const breaker = breakers[serviceKey];

//   return {
//     canRequest() {
//       if (breaker.state === "OPEN") {
//         if (Date.now() > breaker.nextTry) {
//           breaker.state = "HALF_OPEN";
//           return true;
//         }
//         return false;
//       }
//       return true;
//     },

//     success() {
//       breaker.failures = 0;
//       breaker.state = "CLOSED";
//     },

//     failure() {
//       breaker.failures += 1;

//       if (breaker.failures >= FAILURE_THRESHOLD) {
//         breaker.state = "OPEN";
//         breaker.nextTry = Date.now() + RESET_TIMEOUT;
//       }
//     }
//   };
// };
