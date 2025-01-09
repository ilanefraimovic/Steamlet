const express = require('express');
const router = express.Router();
const FriendRequestController = require('../controllers/friendRequestController');

router.post('/newRequest', FriendRequestController.newRequest);

router.delete('deleteRequest/:requestId', FriendRequestController.deleteRequest);

router.patch('/confirmRequest/:requestId', FriendRequestController.confirmRequest);

router.get('/friendRequests/:userId', FriendRequestController.getRequestsByUserId);

module.exports = router;