const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  createSupplier
} = require('../controllers/suppliersController');

router.get('/', getSuppliers);
router.post('/', createSupplier);

module.exports = router;

