"use strict";

const QRCode = require("../../models/QRCode");
const ParticipantFood = require("../../models/ParticipantFood");
const ParticipantStay = require("../../models/ParticipantStay");
const ApiError = require("../../error/ApiError");
const ERROR_CODES = require("../../error/errorCodes");

/**
 * ENTRY SCAN
 */
exports.scanEntry = async ({ qrToken }) => {
  const qr = await QRCode.findOne({ qrToken, isActive: true });
  if (!qr) {
    throw new ApiError({
      status: 400,
      code: ERROR_CODES.NOT_FOUND,
      message: "Invalid QR code"
    });
  }

  qr.lastScannedAt = new Date();
  await qr.save();

  return {
    allowed: true,
    message: "Entry allowed"
  };
};

/**
 * FOOD SCAN
 */
exports.scanFood = async ({ qrToken, eventDayId, bodyClockType }) => {
  const qr = await QRCode.findOne({ qrToken, isActive: true });
  if (!qr) {
    throw new ApiError({
      status: 400,
      code: ERROR_CODES.NOT_FOUND,
      message: "Invalid QR code"
    });
  }

  const food = await ParticipantFood.findOne({
    participantId: qr.participantId,
    eventDayId,
    bodyClockType
  });

  if (!food) {
    return {
      allowed: false,
      reason: "Food not paid for this slot"
    };
  }

  qr.lastScannedAt = new Date();
  await qr.save();

  return {
    allowed: true,
    message: "Food access granted"
  };
};

/**
 * STAY SCAN
 */
exports.scanStay = async ({ qrToken, eventDayId }) => {
  const qr = await QRCode.findOne({ qrToken, isActive: true });
  if (!qr) {
    throw new ApiError({
      status: 400,
      code: ERROR_CODES.NOT_FOUND,
      message: "Invalid QR code"
    });
  }

  const stay = await ParticipantStay.findOne({
    participantId: qr.participantId,
    eventDayId
  });

  if (!stay) {
    return {
      allowed: false,
      reason: "Stay not booked"
    };
  }

  qr.lastScannedAt = new Date();
  await qr.save();

  return {
    allowed: true,
    message: "Stay access granted"
  };
};
