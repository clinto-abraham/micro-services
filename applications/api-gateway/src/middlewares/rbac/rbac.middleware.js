"use strict";

const { errorResponse } = require("../../utils/response.util");

module.exports = function rbac(allowedRoles = []) {
  return (req, res, next) => {
    const roles = req.context.userContext.roles || [];

    const allowed = roles.some(r => allowedRoles.includes(r));
    if (!allowed) {
      return res.status(403).json(
        errorResponse({
          message: "Access denied",
          errorCode: "INSUFFICIENT_ROLE",
          statusCode: 403,
          requestId: req.context.requestId
        })
      );
    }

    next();
  };
};
