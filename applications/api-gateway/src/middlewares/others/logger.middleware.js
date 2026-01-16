// const morgan = require("morgan");
// const { v4: uuid } = require("uuid");

// module.exports = [
//   (req, res, next) => {
//     req.requestId = uuid();
//     res.setHeader("X-Request-ID", req.requestId);
//     next();
//   },
//   morgan(":method :url :status :response-time ms - :req[x-request-id]")
// ];
