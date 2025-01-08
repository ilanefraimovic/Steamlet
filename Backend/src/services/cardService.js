// src/services/userService.js
const CardRepository = require('../dataAccess/cardRepository');

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

  addCard: async (cardData) => {
    try {
      console.log("card data from card service: " + JSON.stringify(cardData));
      const newCardId = await CardRepository.createCard(cardData);
      return newCardId;
    } catch (error) {
      throw error;
    }
  },
  deleteCard: async (cardId_) => {
    try {
      const cardId = await CardRepository.deleteCard(cardId_);
      if (!cardId) throw new Error('Card not found');
      return cardId;
    } catch (error) {
      throw error;
    }
  },

  updateCard: async (cardData) => {
    try {
      const cardId = await CardRepository.updateCard(cardData);
      return cardId;
    } catch (error) {
      throw error;
    }
  }

};

module.exports = CardService;
