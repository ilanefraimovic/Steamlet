// src/dataAccess/userRepository.js
const db = require('../config/db');
const User = require('../models/userModel');

const UserRepository = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, create_date FROM users', (error, results) => {
        if (error) {
            console.log(error);
            return reject(error);
        };

        // Map results to User instances if needed
        const users = results.map(row => new User({id: row.id, userName: row.username, createDate: row.create_date}));
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
      const query = 'INSERT INTO users (username, password, create_date) VALUES (?, ?, NOW())';
      const values = [userData.userName, userData.password];
      
      db.query(query, values, (error, results) => {
        if (error) {
          return reject(error); // Reject promise on error
        }
        resolve(results.insertId); // Resolve with the generated user ID
      });
    });
  }
  
  
  
};

module.exports = UserRepository;
