const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Tylko admin może dodawać użytkowników' });
  }

  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    login: req.body.login,
    password: hashed,
    role: 'USER',
    permissions: req.body.permissions,
    owner: req.userId
  });

  await user.save();
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ owner: req.userId });
  res.json(users);
};

