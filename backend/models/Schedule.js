const mongoose = require('mongoose');


const ScheduleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true }, // np. '2026-01'
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      days: [
        {
          day: Number, // 1-31
          startHour: String, // np. '08:00'
          endHour: String // np. '16:00'
        }
      ]
    }
  ]
}, { timestamps: true });


module.exports = mongoose.model('Schedule', ScheduleSchema);
