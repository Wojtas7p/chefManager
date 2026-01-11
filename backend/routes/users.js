const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, getUsers } = require('../controllers/usersController');

router.post('/', auth, createUser);
router.get('/', auth, getUsers);

module.exports = router;

