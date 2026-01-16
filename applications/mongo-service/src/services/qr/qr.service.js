"use strict";

const QRCode = require("qrcode");
const crypto = require("crypto");
const QRModel = require("../../models/QRCode");

/**
 * Generate QR for participant
 */
exports.generateParticipantQR = async ({ participantId, eventId }) => {
  // 1. Create secure random token
  const qrToken = crypto.randomBytes(32).toString("hex");

  // 2. Store in DB
  await QRModel.create({
    participantId,
    qrToken,
    isActive: true,
    eventId
  });

  // 3. Generate QR image (base64)
  const qrPayload = JSON.stringify({ qrToken });

  const qrImage = await QRCode.toDataURL(qrPayload, {
    errorCorrectionLevel: "H"
  });

  return {
    qrToken,
    qrImage // send to frontend to display
  };
};
