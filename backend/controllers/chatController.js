// controllers/chatController.js


const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { receiverId, groupId } = req.query;

  const filter = { owner: req.ownerId };

  if (groupId) {
    filter.group = groupId;
  } else if (receiverId) {
    filter.$or = [
      { sender: req.userId, receiver: receiverId },
      { sender: receiverId, receiver: req.userId }
    ];
  }

  const messages = await Message.find(filter)
    .populate('sender', 'name')
    .sort({ createdAt: 1 });

  res.json(messages);
};

exports.sendMessage = async (req, res) => {
  const { text, receiverId, groupId } = req.body;

  const message = new Message({
    owner: req.ownerId,
    sender: req.userId,
    receiver: receiverId || null,
    group: groupId || null,
    text,
    readBy: [req.userId]
  });

  await message.save();
  res.status(201).json(message);
};

exports.getUnread = async (req, res) => {
  const userId = req.userId;

  const unreadGroupMessages = await Message.find({
    owner: req.ownerId,
    group: { $ne: null },
    sender: { $ne: userId },
    readBy: { $ne: userId }
  }).select('group');

  const unreadPrivateMessages = await Message.find({
    owner: req.ownerId,
    receiver: userId,
    sender: { $ne: userId },
    readBy: { $ne: userId }
  }).select('sender');

  const unreadGroups = [...new Set(unreadGroupMessages.map(m => m.group.toString()))];
  const unreadUsers = [...new Set(unreadPrivateMessages.map(m => m.sender.toString()))];

  res.json({ users: unreadUsers, groups: unreadGroups });
};

exports.markAsRead = async (req, res) => {
  const { receiverId, groupId } = req.body;

  if (groupId) {
    await Message.updateMany(
      {
        owner: req.ownerId,
        group: groupId,
        readBy: { $ne: req.userId }
      },
      { $addToSet: { readBy: req.userId } }
    );
  }

  if (receiverId) {
    await Message.updateMany(
      {
        owner: req.ownerId,
        receiver: req.userId,
        sender: receiverId,
        readBy: { $ne: req.userId }
      },
      { $addToSet: { readBy: req.userId } }
    );
  }

  res.sendStatus(204);
};
