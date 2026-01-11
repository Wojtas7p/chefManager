// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Brak tokenu' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch {
//     res.status(401).json({ error: 'Nieprawidłowy token' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Brak tokenu' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userPermissions = decoded.permissions;
    req.ownerId = decoded.owner || decoded.userId; // główny właściciel konta
    next();
  } catch {
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
};

