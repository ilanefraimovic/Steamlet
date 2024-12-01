// src/dataAccess/setRepository.js
const db = require('../config/db');
const Set = require('../models/setModel');

const SetRepository = {
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
            const query = 'SELECT * FROM sets WHERE set_id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                } 
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
                SET user_id = ?, name = ?, create_date = NOW() 
                WHERE set_id = ?
            `;
            const values = [user_id, name, id];
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
    },
    /**
     * Retrieves a list of set IDs associated with a given user ID.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<Set[]>} A promise that resolves to an array of sets.
     */
    getSetsByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT s.set_id AS id, s.user_id, s.name, MAX(s.create_date) AS date, COUNT(c.card_id) AS count 
                FROM sets s
                LEFT JOIN cards c ON s.set_id = c.set_id
                WHERE s.user_id = ?
                GROUP BY s.set_id, s.user_id, s.name`;
        
            db.query(query, [userId], (error, results) => {
                if (error) {
                    return reject(error); // Reject the promise on error
                }
        
                // Map results into `Set` objects
                const sets = results.map(row => new Set({
                    id: row.id,
                    user_id: row.user_id,
                    name: row.name,
                    date: row.date, // Make sure your query includes `date`
                    count: row.count
                }));
                resolve(sets);
            });
        });
    }
    
};

module.exports = SetRepository;
