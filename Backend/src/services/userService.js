// src/services/userService.js
const UserRepository = require('../dataAccess/userRepository');

const UserService = {
  getAllUsers: async () => {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const newUserId = await UserRepository.createUser(userData);
      return newUserId;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserService;
