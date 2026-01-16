"use strict";
const mongoose = require("mongoose");

const authProviderModel = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["GOOGLE", "APPLE", "FACEBOOK"],
      required: true
    },
    providerId: {
      type: String,
      required: true
    }
  },
  { _id: false }
);



const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    passwordHash: String,

    authProviders: {
      type: [authProviderModel],
      default: []
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true
    },

    twoFactor: {
      enabled: { type: Boolean, default: false },
      secret: { type: String } // encrypted TOTP secret
    },

    // 🧑 Core Identity
    name: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    // 👨‍👩‍👧 Hierarchy
    parentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // 🧑‍💼 Roles
    roles: [
      {
        type: String,
        enum: [
          "OWNER",
          "ADMIN",
          "HOST",
          "VOLUNTEER",
          "CORE_TEAM",
          "PARTICIPANT"
        ]
      }
    ],

    createdBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    },
    updatedBy: {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE"
    },
  },
  { timestamps: true }
);


// Unique email if present
UserModel.index({ email: 1 }, { unique: true, sparse: true });

// Username should be unique (system-assigned)
UserModel.index({ username: 1 }, { unique: true });

// Registration ID unique
// UserModel.index({ registrationId: 1 }, { unique: true });

// Auth identity unique only when providerId exists
UserModel.index(
  { authProvider: 1, providerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      providerId: { $type: "string" }
    }
  }
);

/**
 * ✅ Enforce at least one login method
 */
UserModel.pre("validate", function (next) {
  if (!this.passwordHash && this.authProviders.length === 0) {
    return next(
      new Error("User must have either password login or provider login")
    );
  }
  next();
});


module.exports = mongoose.model('User', UserModel);

// location: {
//   city: String,
//   state: String,
//   country: String
// },


// registrationId: {
//   type: String,
//   required: true,
//   trim: true,
//   index: true
// },


/**
 * Compound indexes
 */
// UserModel.index({ authProvider: 1, providerId: 1 }, { unique: true, sparse: true });
// UserModel.index({ email: 1 }, { unique: true, sparse: true });
// UserModel.index({ phone: 1 }, { unique: true, sparse: true });
