const FriendRequestService = require('../services/friendRequestService');

const FriendRequestController = {
    newRequest: async (req, res) => {
        try {
            console.log("Friend request info from Controller:");
            console.log(req.body);
            const {fromUserId, toUserId} = req.body;
            
            const response = FriendRequestService.newRequest(fromUserId, toUserId);
            res.json({ response });
        } catch (error) {
            res.status(500).json({error: error.message });
        }
    },

    deleteRequest: async (req, res) => {
        try {
            console.log("Delete request info from Controller:");
            console.log(req.params.requestId);
            const requestId = req.params.requestId;
            if (!requestId) throw new Error("RequestID is required");
            const response = FriendRequestService.deleteRequest(requestId);
            res.json({ response });

        } catch (error) {
            res.status(500).json({error: error.message });
        }

    },

    confirmRequest: async (req, res) => {
        try {
            console.log("Confirm Request info from Controller:");
            console.log(req.params.requestId);
            const requestId = req.params.requestId;
            if (!requestId) throw new Error("RequestID is required");
            const response = FriendRequestService.confirmRequest(requestId);
            res.json({ response });
            

        } catch (error) {
            res.status(500).json({error: error.message });
        }

    },

    getRequestsByUserId: async (req, res) => {
        try {
          const userId = req.params.userId;
          console.log("set id from cardController: " + userId);
          const requests = await FriendRequestService.getRequestsByUserId(userId);
          res.json(requests);
          console.log("first request: " + requests[0].requestId);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }

    }
};

module.exports = FriendRequestController;