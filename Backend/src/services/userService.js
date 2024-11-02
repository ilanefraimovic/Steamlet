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

    /**
     * Creates a new user.
     * @param {User} userData - The user data.
     * @returns {Promise<number>} The new user ID.
     */
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
