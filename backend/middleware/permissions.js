module.exports = (permission) => {
  return (req, res, next) => {
    // ADMIN zawsze może
    if (req.userRole === 'ADMIN') return next();

    // readOnly = blokada wszystkiego poza GET
    if (req.userPermissions?.readOnly) {
      return res.status(403).json({ error: 'Tylko podgląd' });
    }

    // brak konkretnego uprawnienia
    if (!req.userPermissions?.[permission]) {
      return res.status(403).json({ error: 'Brak uprawnień' });
    }

    next();
  };
};
