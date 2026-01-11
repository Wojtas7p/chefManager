// const express = require('express');
// const router = express.Router();
// const {
//   getSuppliers,
//   createSupplier
// } = require('../controllers/suppliersController');

// router.get('/', getSuppliers);
// router.post('/', createSupplier);

// module.exports = router;


const router = require('express').Router();
const auth = require('../middleware/auth');
const permissions = require('../middleware/permissions');
const { getSuppliers, createSupplier } = require('../controllers/suppliersController');

router.get('/', auth, getSuppliers);
router.post('/', auth, createSupplier);

module.exports = router;

