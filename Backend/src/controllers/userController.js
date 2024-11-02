const User = require('../models/userModel');
const UserService = require('../services/userService');

const UserController = {
  // Fetch all users and return in response
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
        const {userName, password} = req.body;
        if(!userName || !password){
            throw new Error("Username and Password are required");
        }

        const userId = await UserService.createUser(new User({userName: userName, password: password}));
        // res.json(users);
        res.json(userId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
        const { userId } = req.body;

        if(!userId){
            throw new Error("UserId is required");
        }
            
        const id = await UserService.deleteUser(new User({id: userId}));
        res.json(id);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;
