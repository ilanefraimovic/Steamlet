// src/services/userService.js
const cardRepository = require('../dataAccess/cardRepository');

const CardService = {
  getAllCards: async () => {
    try {
      const cards = await CardRepository.getAllCards();
      return cards;
    } catch (error) {
      throw error;
    }
  },

  getCardById: async (id) => {
    try {
      const card = await CardRepository.getCardById(id);
      if (!card) throw new Error('Card not found');
      return card;
    } catch (error) {
      throw error;
    }
  },

  createCard: async (cardData) => {
    try {
      const newCardId = await CardRepository.createUser(cardData);
      return newCardId;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = CardService;
