// routes/auth.js

const router = require('express').Router();
const auth = require('../controllers/authController');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/verify-otp', auth.verifyOtp);

module.exports = router;

