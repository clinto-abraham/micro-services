const RegistrationNumberPoolModel = require("../../models/RegistrationNumberPoolModel");

const allocateRegistrationNumber = async (eventId) => {
  // 1️⃣ Try reuse freed number
  const pool = await RegistrationNumberPoolModel.findOneAndUpdate(
    { eventId, freedNumbers: { $exists: true, $not: { $size: 0 } } },
    { $pop: { freedNumbers: -1 } }, // remove smallest
    { new: true }
  );

  if (pool && pool.freedNumbers.length >= 0) {
    const reusedNumber = pool.freedNumbers[0];
    return reusedNumber;
  }

  // 2️⃣ Else increment event counter
  const event = await Event.findByIdAndUpdate(
    eventId,
    { $inc: { "registrationMeta.maxIssuedNumber": 1 } },
    { new: true }
  );

  return event.registrationMeta.maxIssuedNumber;
};

module.exports = {
    allocateRegistrationNumber
}