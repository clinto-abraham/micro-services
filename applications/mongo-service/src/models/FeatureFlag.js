// models/FeatureFlag.js
const mongoose = require("mongoose");

const FeatureFlagSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  enabled: { type: Boolean, default: false }
});

module.exports = mongoose.model("FeatureFlag", FeatureFlagSchema);
