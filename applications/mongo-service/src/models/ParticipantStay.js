const mongoose = require('mongoose');

const ParticipantStaySchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  eventDayId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDay' },
  stayDurationId: { type: mongoose.Schema.Types.ObjectId, ref: 'StayDuration' },
  priceApplied: Number,
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
});

module.exports = mongoose.model('ParticipantStay', ParticipantStaySchema);
