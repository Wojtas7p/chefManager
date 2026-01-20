const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  requestTimeOff,
  getMyTimeOff,
  saveTimeOff
} = require('../controllers/timeOffController');

router.post('/request', auth, requestTimeOff); // user
router.get('/me', auth, getMyTimeOff);          // user
router.post('/admin', auth, saveTimeOff);      // admin

module.exports = router;

