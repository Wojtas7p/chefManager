const TimeOff = require('../models/TimeOff');


exports.saveTimeOff = async (req, res) => {
  const { userId, from, to, type } = req.body;

  const timeOff = new TimeOff({
    owner: req.ownerId,
    user: userId,
    from,
    to,
    type // 'VACATION' | 'DAY_OFF'
  });

  await timeOff.save();
  res.status(201).json(timeOff);
};

exports.requestTimeOff = async (req, res) => {
  const { from, to, type, note } = req.body;

  const off = new TimeOff({
    owner: req.ownerId,
    user: req.userId,
    from,
    to,
    type,
    note
  });

  await off.save();
  res.status(201).json(off);
};

exports.getMyTimeOff = async (req, res) => {
  const offs = await TimeOff.find({
    owner: req.ownerId,
    user: req.userId
  });

  res.json(offs);
};
