// const User = require('../models/User');
// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const hashed = await bcrypt.hash(req.body.password, 10);
//   const user = new User({
//     login: req.body.login,
//     password: hashed
//   });
//   await user.save();
//   res.status(201).json({ message: 'User created' });
// };

// exports.login = async (req, res) => {
//   const user = await User.findOne({ login: req.body.login });
//   if (!user) return res.status(401).json({ error: 'Błąd logowania' });

//   const ok = await bcrypt.compare(req.body.password, user.password);
//   if (!ok) return res.status(401).json({ error: 'Błąd logowania' });

//   const token = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' }
//   );

//   res.json({ token });
// };



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    login: req.body.login,
    password: hashed,
    role: 'ADMIN',
    permissions: { canAddSuppliers: true, canAddProducts: true, readOnly: false }
  });

  await user.save();
  res.status(201).json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ login: req.body.login });
  if (!user) return res.status(401).json({ error: 'Błąd logowania' });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ error: 'Błąd logowania' });

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      permissions: user.permissions,
      owner: user.owner || user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};
