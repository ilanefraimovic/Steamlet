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

  // Other controller methods...
};

module.exports = UserController;
