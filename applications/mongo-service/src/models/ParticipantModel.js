"use strict";
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    linkedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    fullName: { type: String, required: true },
    age: { type: Number, min: 5, required: true },

    relationshipToOwner: {
      type: String,
      enum: ["SELF", "SPOUSE", "CHILD", "PARENT", "OTHER"],
      default: "SELF"
    },

    contact: {
      email: String,
      phone: String
    },

    location: {
      city: String,
      state: String,
      country: String
    },

    createdBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    },
    
    lastUpdatedBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);
