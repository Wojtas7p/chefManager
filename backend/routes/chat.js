const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/chatController');

router.get('/', auth, ctrl.getMessages);
router.post('/', auth, ctrl.sendMessage);

router.get('/unread', auth, ctrl.getUnread);
router.post('/read', auth, ctrl.markAsRead);

module.exports = router;
