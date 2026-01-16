"use strict";

const qrService = require("../../services/qr/qr.service");

exports.generateQR = async (req, res, next) => {
  try {
    const { participantId, eventId } = req.body;

    const body = { participantId, eventId };

    const result = await qrService.generateParticipantQR(body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
