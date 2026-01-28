const ChatGroup = require('../models/ChatGroup');

exports.createGroup = async (req, res) => {
  const { name, members } = req.body;

  const group = new ChatGroup({
    owner: req.userId,
    name,
    members: [req.userId, ...members]
  });

  await group.save();
  res.status(201).json(group);
};

exports.getGroups = async (req, res) => {
  const groups = await ChatGroup.find({
    members: req.userId
  });

  res.json(groups);
};

exports.leaveGroup = async (req, res) => {
  const { groupId } = req.params;

  await ChatGroup.findByIdAndUpdate(groupId, {
    $pull: { members: req.userId }
  });

  res.sendStatus(204);
};
