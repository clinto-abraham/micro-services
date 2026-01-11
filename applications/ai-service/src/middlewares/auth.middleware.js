const jwt = require("jsonwebtoken");
const { INTERNAL_JWT_SECRET } = require("../configs/env");

module.exports = (req, res, next) => {
  const token = req.headers["x-internal-token"];
  if (
    process.env.NODE_ENV === "development" &&
    process.env.ALLOW_DEV_BYPASS === "true"
  ) {
    return next();
  }

  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, INTERNAL_JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};
