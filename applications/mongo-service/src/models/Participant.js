"use strict";

const mongoose = require("mongoose");

const participantModel = new mongoose.Schema(
  {
    /**
     * Who created / manages this participant
     */
    guardianUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true
    },

    /**
     * If participant later creates their own login
     */
    linkedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    officialId: {
      idType: {
        type: String,
        enum: ["PASSPORT", "VOTER_ID", "DRIVING_LICENSE", "SCHOOL_ID", "OTHERS"]
      },
      idNumber: {
        type: String
      },
      idName: {
        type: String
      },
      idUploadURL: {
        type: String
      },
    },

    location: {
      city: String,
      state: String,
      country: String
    },

    events: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true
        },
        registeredAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    privilegeStatus: {
      type: String,
      enum: ['REGULAR', 'UNDER_PRIVILEGED'],
      default: 'REGULAR'
    },

     status: {
      type: String,
      enum: ["ACTIVE", "DELETED", "NON_ACTIVE"],
      default: "ACTIVE"
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


module.exports = mongoose.model("Participant", participantModel);



// const mongoose = require('mongoose');

// const ParticipantSchema = new mongoose.Schema({
//   eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
//   fullName: String,

//   participantType: {
//     type: String,
//     enum: ['VOLUNTEER','CORE_TEAM','HOST','PARTICIPANT']
//   },


// }, { timestamps: true });

// module.exports = mongoose.model('Participant', ParticipantSchema);


/**
 * 🔐 Validation rule:
 * If age < 14 → government ID mandatory
 */
// participantModel.pre("validate", function (next) {
//   if (this.age < 14) {
//     if (!this.governmentId?.idNumber) {
//       return next(
//         new Error("Government ID required for participants below 14 years")
//       );
//     }
//   }
//   next();
// });

