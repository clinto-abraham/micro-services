const mongoose = require('mongoose');

const StayDurationSchema = new mongoose.Schema({
  code: { type: String, enum: ['FULL_24H','HALF_12H','FRESH_UP'] },
  hours: Number
});

module.exports = mongoose.model('StayDuration', StayDurationSchema);
