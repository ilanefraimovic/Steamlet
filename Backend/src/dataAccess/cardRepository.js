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
      console.log("retrieving cards, set id : " + id);
      db.query('SELECT * FROM cards WHERE set_id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);

        const cards = results.map(row => new Card(row));
        console.log("results from card get api: " + cards);
        resolve(cards);
      });
    });
  },
  createCard: (cardData) => {
    console.log("card data from card repository: " + JSON.stringify(cardData));
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO cards (set_id, term, definition, create_date) 
        VALUES (?, ?, ?, CURRENT_DATE)
      `;
      const values = [cardData.setId, cardData.term, cardData.definition];

      db.query(query, values, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  },
  deleteCard: (cardId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM cards WHERE card_id = ?`;
  
      db.query(query, [cardId], (error, results) => {
        if (error) return reject(error);
        resolve(cardId); // Returns the Card Id if successful
      });
    });
  },

  deleteCardsBySetId: (setId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM cards WHERE set_id = ?`;
  
      db.query(query, [setId], (error, results) => {
        if (error) return reject(error);
        resolve(setId); // Returns the Card Id if successful
      });
    });

  },

  updateCard: (cardData) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE cards
        SET term = ?, definition = ?
        WHERE card_id = ?
      `;
      const values = [cardData.term, cardData.definition, cardData.id];
  
      db.query(query, values, (error, results) => {
        if (error) return reject(error);
        resolve(cardData.id); // Returns the card ID that was effected
      });
    });
  }
};

module.exports = CardRepository;
