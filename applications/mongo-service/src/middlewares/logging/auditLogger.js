// middlewares/auditLogger.js
const AuditLog = require("../../models/AuditLog");

module.exports = (req, res, next) => {
  res.on("finish", async () => {
    try {
      const { requestId, route, ip, userAgent, deviceId } = req.body || {};

      await AuditLog.create({
        requestId,
        route,
        method: req.method,
        ip,
        userAgent,
        deviceId,
        success: res.statusCode < 400
      });
    } catch (e) {
      // Silent fail (never block request)
      console.log("=> middlewares/auditLogger.js Error Catch:",e)
    }
  });

  next();
};
