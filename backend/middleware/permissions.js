module.exports = (permission) => {
  return (req, res, next) => {
    if (req.userRole === 'ADMIN') return next();
    if (!req.userPermissions?.[permission]) {
      return res.status(403).json({ error: 'Brak uprawnień' });
    }
    next();
  };
};

