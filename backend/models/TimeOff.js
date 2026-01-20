const mongoose = require('mongoose');

const TimeOffSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    type: {
      type: String,
      enum: ['DAY_OFF', 'VACATION'],
      required: true
    },

    from: { type: Date, required: true },
    to: { type: Date, required: true },

    note: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TimeOff', TimeOffSchema);
