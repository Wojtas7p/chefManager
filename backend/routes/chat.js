const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMessages, sendMessage } = require('../controllers/chatController');

router.get('/', auth, getMessages);
router.post('/', auth, sendMessage);

module.exports = router;
