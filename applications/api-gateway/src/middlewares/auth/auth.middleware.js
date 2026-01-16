"use strict";

const jwt = require("jsonwebtoken");
const { errorResponse } = require("../../utils/response.util");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      errorResponse({
        message: "Missing auth token",
        errorCode: "AUTH_MISSING",
        statusCode: 401,
        requestId: req.context.requestId
      })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.context.userContext = {
      userId: decoded.sub,
      roles: decoded.roles || []
    };
    next();
  } catch {
    return res.status(401).json(
      errorResponse({
        message: "Invalid token",
        errorCode: "AUTH_INVALID",
        statusCode: 401,
        requestId: req.context.requestId
      })
    );
  }
};
