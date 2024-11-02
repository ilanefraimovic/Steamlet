// src/services/userService.js
const UserRepository = require('../dataAccess/userRepository');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
            // Hash the password before setting it on the userData object
            const hashedPassword = await bcrypt.hash(userData.password, 2);
            userData.password = hashedPassword;
            // Assuming `User` expects an object rather than individual arguments
            const user = new User(userData);
        
            // Save the user using the repository
            const newUserId = await UserRepository.createUser(user);
            return newUserId;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserService;
