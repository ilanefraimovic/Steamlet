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

        console.log(req.body);
        const {userName, password} = req.body;
        if(!userName || !password){
            throw new Error("Username and Password are required");
        }

        const users = await UserService.createUser(new User({userName: userName, password: password}));
        // res.json(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;
