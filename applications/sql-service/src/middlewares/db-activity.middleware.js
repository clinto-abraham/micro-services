// "use strict";

// const db = require("../configs/sequelize");

// module.exports = async (req, res, next) => {
//   try {
//     if (!db.getSequelize()) {
//       await db.startDB();
//     } else {
//       db.resetIdleTimer();
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// };
