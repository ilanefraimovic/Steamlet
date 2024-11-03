// src/services/userService.js
const UserRepository = require('../dataAccess/userRepository');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const SetRepository = require('../dataAccess/setRepository');
const LoggedInUser = require('../models/userLoginModel');

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
    },
    /**
     * Delete a user.
     * @param {User} userData - The user data.
     * @returns {Promise<number>} The old user ID.
     */
    deleteUser: async (userData) => {
        try {
            // Delete the user using the repository
            const oldUserId = await UserRepository.deleteUser(userData);
            return oldUserId;
        } catch (error) {
            throw error;
        }
    },
    loginUserAndReturnObject: async (userData) => {
        try {

            const user = new User(userData);
            // Get the userId
            const userId = await UserRepository.loginUser(user);

            //Retrieve the set ids affiliated with the user
            const sets = await SetRepository.getSetIdsByUserId(userId);
            return new LoggedInUser({userId: userId, sets: sets});
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserService;
