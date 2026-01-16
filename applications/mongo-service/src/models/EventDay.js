const mongoose = require('mongoose');

const EventDaySchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  dayNumber: Number,
  eventDate: Date
});

module.exports = mongoose.model('EventDay', EventDaySchema);
