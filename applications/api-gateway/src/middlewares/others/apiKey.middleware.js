// "use strict";

// module.exports = (req, res, next) => {
//   const apiKey = req.headers["x-api-key"];

//   if (!apiKey || apiKey !== process.env.PUBLIC_API_KEY) {
//     return res.status(401).json({
//       success: false,
//       error: "INVALID_API_KEY"
//     });
//   }

//   next();
// };
