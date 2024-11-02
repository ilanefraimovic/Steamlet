// src/dataAccess/userRepository.js
const db = require('../config/db');
const User = require('../models/userModel');

const UserRepository = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error);
            return reject(error);
        };

        // Map results to User instances if needed
        const users = results.map(row => new User(row.id, row.name, row.email, row.password));
        resolve(users);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);

        const user = new User(results[0].id, results[0].name, results[0].email, results[0].password);
        resolve(user);
      });
    });
  },

  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', userData, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }
};

module.exports = UserRepository;
