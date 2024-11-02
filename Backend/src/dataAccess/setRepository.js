// src/dataAccess/setRepository.js
const db = require('../config/db');
const Set = require('../models/setModel');

const SetRepository = {
    // ... other methods remain unchanged
    getAllSets: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sets', (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
    
                // Ensure results is an array
                const sets = Array.isArray(results) ? results.map(row => new Set(row)) : [];
                resolve(sets);
            });
        });
    },
    getSetById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM sets WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }

                // Assuming 'id' is unique, we expect one result or none
                const set = results.length > 0 ? new Set(results[0]) : null;
                resolve(set);
            });
        });
    },
    createSet: (setData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO sets (user_id, name, create_date) VALUES (?, ?, ?)';
            const values = [setData.user_id, setData.name, setData.date];
            console.log(values);
            db.query(query, values, (error, results) => {
              //  const sets = Array.isArray(results) ? results.map(row => new Set(row)) : [];
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    },


    updateSet: (updatedData) => {
        return new Promise((resolve, reject) => {
            const { user_id,name, date,id } = updatedData;
            const query = ` 
                UPDATE sets 
                SET user_id = ?, name = ?, create_date = ? 
                WHERE set_id = ?
            `;
            const values = [user_id, name, date, id];
            console.log(values);
            db.query(query, values, (error, results) => {
                if (error) {
                    console.log("Error updating set:", error);
                    return reject(error);
                }
                resolve(results.affectedRows); // Returns number of rows updated
            });
        });
    },
    deleteSet: (setData) => {
      return new Promise((resolve, reject) => {
        const query = 'DELETE FROM sets WHERE id = ?';
        
        db.query(query, [setData.id], (error, results) => {
          if (error) {
            return reject(error); // Reject promise on error
          }
          
          // Check if a row was deleted
          if (results.affectedRows === 0) {
            return reject(new Error('Set not found')); // Reject if no rows affected
          }
    
          resolve(true); // Resolve if delete was successful
        });
      });
    }
    
};

module.exports = SetRepository;
