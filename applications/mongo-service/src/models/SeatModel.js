"use strict";
const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    seatNumber: { type: String, required: true },   // C_57
    seatNumeric: { type: Number, required: true }, // 57

    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED", "CHECKED_IN"],
      default: "ACTIVE"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastUpdatedBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      updatedAt: Date
    }
  },
  { timestamps: true }
);

seatSchema.index({ eventId: 1, participantId: 1 }, { unique: true });
seatSchema.index({ eventId: 1, seatNumeric: 1 }, { unique: true });

module.exports = mongoose.model("Seat", seatSchema);
