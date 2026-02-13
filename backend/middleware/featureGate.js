module.exports = (requiredPlan) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Brak autoryzacji' });
    }

    const plans = ['FREE', 'PRO', 'ENTERPRISE'];

    const userPlanIndex = plans.indexOf(req.user.plan);
    const requiredPlanIndex = plans.indexOf(requiredPlan);

    if (userPlanIndex < requiredPlanIndex) {
      return res.status(403).json({
        error: 'Funkcja dostępna w wyższym planie'
      });
    }

    next();
  };
};
