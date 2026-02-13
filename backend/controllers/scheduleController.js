const Schedule = require('../models/Schedule');
const TimeOff = require('../models/TimeOff');


// exports.saveSchedule = async (req, res) => {
//   const { month, users } = req.body;

//   const schedule = await Schedule.findOneAndUpdate(
//     { owner: req.ownerId, month },
//     { users },
//     { upsert: true, new: true }
//   ).populate('users.user', 'name');

//   res.json(schedule);
// };

exports.saveSchedule = async (req, res) => {
  const { month, users } = req.body;

  // 🔥 WAŻNE — czyścimy dane przed zapisem
  const cleanUsers = users.map(u => ({
    ...u,
    days: (u.days || []).filter(d => d && d.day) // USUWA NULL
  }));

  const schedule = await Schedule.findOneAndUpdate(
    { owner: req.ownerId, month },
    { users: cleanUsers },   // ← zapisujemy CZYSTE dane
    { upsert: true, new: true }
  ).populate('users.user', 'name');

  res.json(schedule);
};



// exports.getSchedule = async (req, res) => {
//   const { month } = req.query;

//   const schedule = await Schedule.findOne({
//     owner: req.ownerId,
//     month
//   }).populate('users.user', 'name');

//   if (!schedule) return res.json(null);

//   const timeOffs = await TimeOff.find({
//     owner: req.ownerId
//   });

//   res.json({ schedule, timeOffs });
// };


exports.getSchedule = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) return res.status(400).json({ error: 'Month is required' });

    console.log('req.ownerId:', req.ownerId);

    const schedule = await Schedule.findOne({
      owner: req.ownerId,
      month
    }).populate('users.user', 'name');

    if (!schedule) return res.json(null);

    const timeOffs = await TimeOff.find({ owner: req.ownerId });

    res.json({ schedule, timeOffs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};
