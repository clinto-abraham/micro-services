module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const roles = req.body?.metadata?.userContext?.roles;

    if (!roles || !Array.isArray(roles)) {
      return res.status(403).json({
        errorCode: "ACCESS_DENIED",
        message: "User roles missing"
      });
    }

    const hasAccess = roles.some(role =>
      allowedRoles.includes(role)
    );

    if (!hasAccess) {
      return res.status(403).json({
        errorCode: "INSUFFICIENT_ROLE",
        message: "You do not have permission to perform this action"
      });
    }

    next();
  };
};
