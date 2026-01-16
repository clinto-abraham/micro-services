"use strict";

const SeatModel = require("../../models/Seat");
const EventModel = require("../../models/Event");
const RegistrationNumberPoolModel = require("../../models/RegistrationNumberPool");

const allocateSeatNumber = async (eventId) => {
  const pool = await RegistrationNumberPoolModel.findOneAndUpdate(
    { eventId, freedNumbers: { $exists: true, $not: { $size: 0 } } },
    { $pop: { freedNumbers: -1 } },
    { new: true }
  );

  if (pool && pool.freedNumbers.length >= 0) {
    return pool.freedNumbers[0];
  }

  const event = await EventModel.findByIdAndUpdate(
    eventId,
    { $inc: { "registrationMeta.maxIssuedNumber": 1 } },
    { new: true }
  );

  return event.registrationMeta.maxIssuedNumber;
};

exports.createSeat = async ({ eventId, participantId, user }) => {
  const numeric = await allocateSeatNumber(eventId);
  const prefix = (await EventModel.findById(eventId)).registrationMeta.prefix;

  const seat = await SeatModel.create({
    eventId,
    participantId,
    ownerUserId: user.id,
    seatNumber: `${prefix}_${numeric}`,
    seatNumeric: numeric,
    createdBy: user.id,
    lastUpdatedBy: {
      userId: user.id,
      name: user.name,
      updatedAt: new Date()
    }
  });

  return {
    success: true,
    statusCode: 201,
    message: "Seat allocated successfully",
    data: { seat }
  };
};




const cancellation = async (registrationId, numericPart, eventId) => {

  await SeatModel.findByIdAndUpdate(registrationId, {
  status: "CANCELLED"
});

await RegistrationNumberPoolModel.findOneAndUpdate(
  { eventId },
  {
    $addToSet: { freedNumbers: numericPart }
  },
  { upsert: true }
);

}

module.exports = {
  cancellation
}