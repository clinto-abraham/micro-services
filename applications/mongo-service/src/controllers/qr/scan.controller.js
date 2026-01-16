"use strict";

const scanService = require("../../services/qr/qr.scan.service");

exports.scanEntry = async (req, res) => {
  try {
    const { qrToken } = req.body;
    const body = { qrToken };

    const result = await scanService.scanEntry(body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.scanFood = async (req, res) => {
  try {
    const { qrToken, eventDayId, bodyClockType } = req.body;
    const body = { qrToken, eventDayId, bodyClockType };

    const result = await scanService.scanFood(body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.scanStay = async (req, res) => {
  try {
    const { qrToken, eventDayId } = req.body;
    const body = { qrToken, eventDayId };

    const result = await scanService.scanStay(body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
