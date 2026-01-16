// models/AuditLog.js
const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  requestId: String,
  route: String,
  method: String,
  ip: String,
  userAgent: String,
  deviceId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  success: Boolean,
  errorCode: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", AuditLogSchema);
