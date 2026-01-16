const mongoose = require("mongoose");

const RegistrationNumberPoolModelSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      unique: true,
      required: true
    },

    freedNumbers: {
      type: [Number], // sorted, reusable numbers
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RegistrationNumberPoolModel",
  RegistrationNumberPoolModelSchema
);


// how to use:
// const number = await allocateRegistrationNumber(eventId);

// const registrationNumber = `${event.registrationMeta.prefix}_${number}`;
