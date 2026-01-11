
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({
    supplier: req.params.supplierId,
    owner: req.ownerId
  });
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    supplier: req.body.supplierId,
    owner: req.ownerId
  });
  await product.save();
  res.status(201).json(product);
};
