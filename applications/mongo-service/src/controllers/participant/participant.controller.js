"use strict";

const participantService = require("../../services/participant/participant.service");
const sendResponse = require("../../utils/sendResponse");

const createParticipantController = async (req, res) => {
  const { payload, requestId } = req.body;
  const userId = req.user.id;

  try {
    const result = await participantService.createParticipant({
      ...payload,
      ownerUserId: userId,
      createdBy: userId
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
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};

const listParticipantsController = async (req, res) => {
  const requestId = req.body?.requestId;
  const userId = req.user.id;

  try {
    const result = await participantService.listParticipants({
      ownerUserId: userId
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
  createParticipantController,
  listParticipantsController
}