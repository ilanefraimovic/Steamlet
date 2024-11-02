// src/dataAccess/userRepository.js
const db = require('../config/db');
const Set = require('../models/setModel');

const SetRepository = {
  getAllSets: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM sets', (error, results) => {
        if (error) {
            console.log(error);
            return reject(error);
        };

        // Map results to Set instances if needed
        const sets = results.map(row => new Set(row.id, row.user_id, row.name, row.date));
        resolve(sets);
      });
    });
  },

  getSetById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM sets WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);

        const set = new Set(results[0].id, results[0].user_id, results[0].name, results[0].date);
        resolve(set);
      });
    });
  },

  createUser: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO sets SET ?', setData, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }
};

module.exports = SetRepository;
