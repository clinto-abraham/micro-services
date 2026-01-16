"use strict";

/**
 * Stub – integrate Twilio / Gupshup / Meta later
 */
exports.sendWhatsApp = async ({ to, message, mediaUrl }) => {
  console.log("📲 WhatsApp queued:", { to, message, mediaUrl });
};

/**
 * Booking success message
 */
exports.sendBookingConfirmation = async ({ user, qrImage }) => {
  await exports.sendWhatsApp({
    to: user.phone,
    message:
      "✅ Your booking is confirmed.\n" +
      "Would you like us to send the QR code to other participants as well?",
    mediaUrl: qrImage
  });
};

/**
 * Reminder (2 days before)
 */
exports.sendEventReminder = async ({ user, event }) => {
  await exports.sendWhatsApp({
    to: user.phone,
    message:
      `⏰ Reminder: ${event.name} starts on ${event.startDate.toDateString()}.\n` +
      "Please carry your QR code."
  });
};
