const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  eventDayId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDay' },
  type: { type: String, enum: ['FOOD','STAY','DONATION'] },
  amount: Number,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
