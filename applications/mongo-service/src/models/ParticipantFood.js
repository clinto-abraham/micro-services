const mongoose = require('mongoose');

const ParticipantFoodSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  eventDayId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDay' },
  foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
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
}, { timestamps: true });

module.exports = mongoose.model('ParticipantFood', ParticipantFoodSchema);
