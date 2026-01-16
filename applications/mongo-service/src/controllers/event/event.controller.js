"use strict";

const eventService = require("../../services/event/event.service");
const sendResponse = require("../../utils/sendResponse");

exports.createEvent = async (req, res) => {
  const { payload, requestId } = req.body;
  const userId = req.user?.id;

  try {
    const result = await eventService.createEvent({
      ...payload,
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

exports.getEvents = async (req, res) => {
  const { requestId } = req.body;
  console.log(req.body, req.query)

  try {
    const result = await eventService.getEvents(req.query);
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

exports.getEventById = async (req, res) => {
  const { requestId } = req.body;

  try {
    const result = await eventService.getEventById({
      eventId: req.params.id
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

exports.updateEvent = async (req, res) => {
  const { requestId, payload } = req.body;
  const userId = req.user?.id;

  try {
    const result = await eventService.updateEvent({
      eventId: req.params.id,
      updatePayload: payload,
      userId
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

exports.deleteEvent = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user?.id;

  try {
    const result = await eventService.deleteEvent({
      eventId: req.params.id,
      userId
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
