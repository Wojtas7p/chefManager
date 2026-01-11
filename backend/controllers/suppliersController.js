// const Supplier = require('../models/Supplier');

// exports.getSuppliers = async (req, res) => {
//   const suppliers = await Supplier.find({ user: req.userId });
//   res.json(suppliers);
// };

// exports.createSupplier = async (req, res) => {
//   const supplier = new Supplier({
//     name: req.body.name,
//     user: req.userId
//   });
//   await supplier.save();
//   res.status(201).json(supplier);
// };


const Supplier = require('../models/Supplier');

exports.getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({ user: req.ownerId });
  res.json(suppliers);
};

exports.createSupplier = async (req, res) => {
  if (!req.userPermissions?.canAddSuppliers && req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Brak uprawnień do dodawania dostawców' });
  }

  const supplier = new Supplier({
    name: req.body.name,
    user: req.ownerId
  });
  await supplier.save();
  res.status(201).json(supplier);
};

