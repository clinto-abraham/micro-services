"use strict";

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true
    },

    eventSubTitle: {
      type: String,
      trim: true
    },

    eventDescription: {
      type: String,
      required: true
    },

    venueName: {
      type: String,
      required: true
    },

    venueImages: [
      {
        type: String,
        required: true
      }
    ],

    eventFee: {
      type: Number,
      default: 0
    },

    hallRent: {
      type: Number,
      default: 0
    },

    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      googleMapsLink: String
    },

    coordinator: {
      name: String,
      phone: String,
      email: String
    },

    speakers: [
      {
        name: String,
        designation: String
      }
    ],

    coreTeam: [
      {
        name: String,
        contact: String
      }
    ],

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    numberOfDays: {
      type: Number,
      required: true
    },

    followUpLink: String,

    remarks: String,

    // 🔐 Admin-only metadata
    adminMeta: {
      policeClearanceLink: String,
      localAuthorityPermissionLink: String,
      fireSafetyCertificateLink: String,
      notes: String
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED", "POSTPONED"],
      default: "DRAFT"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    registrationMeta: {
      prefix: {
        type: String, // C, K, B, etc
        required: true
      },

      maxIssuedNumber: {
        type: Number,
        default: 0
      }
    },

    createdBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    },

    updatedBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    }
  },
  { timestamps: true }
);

// Indexes
EventSchema.index({ startDate: 1 });
EventSchema.index({ "location.city": 1 });
EventSchema.index({ status: 1 });

module.exports = mongoose.model("Event", EventSchema);
