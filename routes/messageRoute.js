const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
const is_authenticated = require('../utils/is-auth');

router.post('/messages', is_authenticated, messageController.sendMessageView);
router.post('/message/create', is_authenticated, messageController.startConvo);

router.get('/conversations', is_authenticated, messageController.getConversations);
router.post('/conversations/send', is_authenticated, messageController.sendMessage);

module.exports = router;