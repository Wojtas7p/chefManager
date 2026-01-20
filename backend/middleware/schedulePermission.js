module.exports = (req, res, next) => {
  if (
    req.userRole === 'ADMIN' ||
    req.userPermissions.canManageSchedule
  ) {
    return next();
  }

  res.status(403).json({ error: 'Brak uprawnień do grafiku' });
};
