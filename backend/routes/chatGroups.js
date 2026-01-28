const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/chatGroupController'); // <- wszystkie funkcje są w ctrl

router.get('/', auth, ctrl.getGroups);
router.post('/', auth, ctrl.createGroup);
router.delete('/:groupId/leave', auth, ctrl.leaveGroup);

module.exports = router;
