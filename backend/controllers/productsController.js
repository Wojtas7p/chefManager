// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       supplier: req.params.supplierId,
//       user: req.userId
//     });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product({
//       name: req.body.name,
//       supplier: req.body.supplierId,
//       user: req.userId
//     });
//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({
    supplier: req.params.supplierId,
    user: req.ownerId
  });
  res.json(products);
};

exports.createProduct = async (req, res) => {
  if (!req.userPermissions?.canAddProducts && req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Brak uprawnień do dodawania produktów' });
  }

  const product = new Product({
    name: req.body.name,
    supplier: req.body.supplierId,
    user: req.ownerId
  });

  await product.save();
  res.status(201).json(product);
};

