"use strict";
const mongoose = require("mongoose");

const foodModel = new mongoose.Schema(
  {
    seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },

    foodType: {
      type: String,
      enum: ["VEG", "NON_VEG", "JAIN", "NONE"],
      default: "NONE"
    },

    meals: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false }
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

module.exports = mongoose.model("Food", foodModel);
