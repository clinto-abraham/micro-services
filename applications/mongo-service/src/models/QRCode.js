"use strict";

const mongoose = require("mongoose");

const QRCodeSchema = new mongoose.Schema(
  {
    qrToken: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: true
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // Usage tracking
    entryUsed: {
      type: Boolean,
      default: false
    },

    foodUsed: {
      type: Map,
      of: Boolean, // MORNING/LUNCH/DINNER
      default: {}
    },

    stayUsed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRCode", QRCodeSchema);



// const mongoose = require("mongoose");

// const QRCodeSchema = new mongoose.Schema({
//   participantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Participant",
//     required: true
//   },

//   qrToken: {
//     type: String,
//     unique: true,
//     index: true
//   },

//   isActive: {
//     type: Boolean,
//     default: true
//   },

//   lastScannedAt: Date
// }, { timestamps: true });

// module.exports = mongoose.model("QRCode", QRCodeSchema);




// const mongoose = require('mongoose');

// const QRCodeSchema = new mongoose.Schema({
//   participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
//   qrHash: { type: String, unique: true }
// });

// module.exports = mongoose.model('QRCode', QRCodeSchema);
