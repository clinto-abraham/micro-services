"use strict";

module.exports = function rejectGetBody(req, res, next) {
  if (req.method === "GET" && req.body && Object.keys(req.body).length > 0) {
    return res.status(400).json({
      success: false,
      errorCode: "GET_BODY_NOT_ALLOWED",
      message: "GET requests must not contain a request body"
    });
  }
  next();
};
