"use strict";
const seatService = require("../../services/seat/seat.service");
const sendResponse = require("../../utils/sendResponse");

const createSeatController = async (req, res) => {
  const { payload, requestId } = req.body;
  const user = req.user;

  try {
    const result = await seatService.createSeat({
      ...payload,
      user
    });

    return sendResponse({ res, result, requestId });
  } catch (err) {
    console.error(err);
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR"
      }
    });
  }
};

module.exports = {
  createSeatController
}