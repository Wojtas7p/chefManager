const router = require('express').Router();
const auth = require('../middleware/auth');
const permissions = require('../middleware/permissions');
const { getProducts, createProduct } = require('../controllers/productsController');

router.get('/:supplierId', auth, getProducts);
router.post('/', auth, permissions('canAddProducts'), createProduct);

module.exports = router;

