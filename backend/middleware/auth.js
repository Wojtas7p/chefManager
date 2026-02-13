
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Użytkownik nie istnieje' });
    }

    req.user = user;

    // opcjonalnie – dla wygody
    req.userId = user._id;
    req.ownerId = user.owner || user._id;
    req.userRole = user.role;
    req.userPermissions = user.permissions;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Nieprawidłowy token' });
  }
};
