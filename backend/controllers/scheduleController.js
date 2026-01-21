const Schedule = require('../models/Schedule');
const TimeOff = require('../models/TimeOff');


exports.saveSchedule = async (req, res) => {
  const { month, users } = req.body;

  const schedule = await Schedule.findOneAndUpdate(
    { owner: req.ownerId, month },
    { users },
    { upsert: true, new: true }
  ).populate('users.user', 'name');

  res.json(schedule);
};


exports.getSchedule = async (req, res) => {
  const { month } = req.query;

  const schedule = await Schedule.findOne({
    owner: req.ownerId,
    month
  }).populate('users.user', 'name');

  if (!schedule) return res.json(null);

  const timeOffs = await TimeOff.find({
    owner: req.ownerId
  });

  res.json({ schedule, timeOffs });
};
