const router = require('express').Router();
const auth = require('../middleware/auth');
const permissions = require('../middleware/permissions');
const { getSuppliers, createSupplier } = require('../controllers/suppliersController');

router.get('/', auth, getSuppliers);
router.post('/', auth, permissions('canAddSuppliers'), createSupplier);

module.exports = router;
