// const express = require('express');
// const router = express.Router();

// // Poprawne importy kontrolerów
// const { getProducts, createProduct } = require('../controllers/productsController');

// router.get('/:supplierId', getProducts);
// router.post('/', createProduct);

// module.exports = router;


const router = require('express').Router();
const auth = require('../middleware/auth');
const { getProducts, createProduct } = require('../controllers/productsController');

router.get('/:supplierId', auth, getProducts);
router.post('/', auth, createProduct);

module.exports = router;

