"use strict";

const Participant = require("../../models/Participant");
const mongoErrorMapperService = require("../utils/mongoErrorMapper.service");

exports.createParticipant = async ({ ownerUserId, createdBy, ...payload }) => {
  try {
    const participant = await Participant.create({
      ...payload,
      ownerUserId,
      createdBy
    });

    return {
      success: true,
      statusCode: 201,
      message: "Participant created successfully",
      data: { participant }
    };

  } catch (err) {
    const mappedError = mongoErrorMapperService(err);
    if (mappedError) return mappedError;
    throw err;
  }
};

exports.listParticipants = async ({ ownerUserId }) => {
  const participants = await Participant.find({ ownerUserId }).populate(
    "events.eventId",
    "eventTitle startDate venueName"
  );

  return {
    success: true,
    statusCode: 200,
    data: { participants }
  };
};
