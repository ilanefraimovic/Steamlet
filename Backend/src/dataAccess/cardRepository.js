// src/dataAccess/userRepository.js
const db = require('../config/db');
const Card = require('../models/cardModel');

const CardRepository = {
  getAllCards: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM cards', (error, results) => {
        if (error) {
            console.log(error);
            return reject(error);
        };

        // Map results to card instances if needed
        const cards = results.map(row => new Card(row.id, row.set_id, row.term, row.definition,row.date));
        resolve(cards);
      });
    });
  },

  getCardById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM cards WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);

        const card = new card(results[0].id, results[0].set_id, results[0].term,results[0].definition, results[0].date);
        resolve(card);
      });
    });
  },

  createCard: (cardData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO cards card ?', cardData, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }
};

module.exports = CardRepository;
