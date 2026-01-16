"use strict";
const mongoose = require("mongoose");

const staySchema = new mongoose.Schema(
  {
    seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },

    stayType: {
      type: String,
      enum: ["NONE", "DORMITORY", "ROOM", "TENT"],
      default: "NONE"
    },

    roomNumber: String,
    checkInDate: Date,
    checkOutDate: Date,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastUpdatedBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      updatedAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stay", staySchema);