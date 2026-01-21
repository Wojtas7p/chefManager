const Message = require('../models/Message');

/**
 * get message
 */
exports.getMessages = async (req, res) => {
  const { receiverId } = req.query;

  const filter = {
    owner: req.ownerId
  };

  if (receiverId) {
    filter.$or = [
      { sender: req.userId, receiver: receiverId },
      { sender: receiverId, receiver: req.userId }
    ];
  } else {
    filter.receiver = null; 
  }

  const messages = await Message.find(filter)
    .populate('sender', 'name')
    .sort({ createdAt: 1 });

  res.json(messages);
};

/**
 * Send message
 */
exports.sendMessage = async (req, res) => {
  const { text, receiverId } = req.body;

  const message = new Message({
    owner: req.ownerId,
    sender: req.userId,
    receiver: receiverId || null,
    text
  });

  await message.save();
  res.status(201).json(message);
};
