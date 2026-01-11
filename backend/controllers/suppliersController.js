
const Supplier = require('../models/Supplier');

exports.getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({ owner: req.ownerId });
  res.json(suppliers);
};

exports.createSupplier = async (req, res) => {
  const supplier = new Supplier({
    name: req.body.name,
    owner: req.ownerId
  });
  await supplier.save();
  res.status(201).json(supplier);
};
