const router = require('express').Router();
const auth = require('../middleware/auth');
const perm = require('../middleware/schedulePermission');
const { saveSchedule, getSchedule } = require('../controllers/scheduleController');

router.post('/', auth, perm, saveSchedule);
router.get('/', auth, getSchedule);

module.exports = router;
