"use strict";

const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  // 🥗 What kind of food
  mealType: {
    type: String,
    enum: ["VEG", "NON_VEG", "NON_SUGAR", "NON_BP", "MEDICAL"],
    required: true
  },

  // ⏰ When it is served
  foodClock: {
    type: String,
    enum: ["MORNING", "LUNCH", "DINNER"],
    required: true
  },

  medicalNotes: {
    type: String
  },

  entitlementCategory: {
    type: String,
    enum: [
      "VOLUNTEER",
      "CORE_TEAM",
      "HOST",
      "PARTICIPANT",
      "FREE_BY_SUPPORT"
    ],
    required: true
  },

  basePrice: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("FoodItem", FoodItemSchema);
