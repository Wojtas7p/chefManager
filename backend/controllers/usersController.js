
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Tylko admin' });
  }

  const { login, password, name, permissions } = req.body;

  if (!login || !password || !name) {
    return res.status(400).json({ error: 'Brak danych' });
  }

  // global login 
  const existsLogin = await User.findOne({ login });
  if (existsLogin) {
    return res.status(400).json({ error: 'Login już istnieje' });
  }

  // kont name 
  const existsName = await User.findOne({
    owner: req.ownerId,
    name
  });

  if (existsName) {
    return res.status(400).json({ error: 'Nazwa użytkownika już istnieje w tym koncie' });
  }

  const hashed = await bcrypt.hash(password, 10);

   const user = new User({
  login: req.body.login,
  password: hashed,
  role: 'USER',
  owner: req.ownerId,
  name: req.body.name,

  permissions: {
    canAddSuppliers: req.body.permissions?.canAddSuppliers || false,
    canAddProducts: req.body.permissions?.canAddProducts || false,
    readOnly: req.body.permissions?.readOnly || true,
    canManageSchedule: req.body.permissions?.canManageSchedule || false
  }
});


  await user.save();
  res.status(201).json({ message: 'Użytkownik dodany' });
};


exports.getUsers = async (req, res) => {
  const users = await User.find({ owner: req.ownerId }).select('-password');
  res.json(users);
};
