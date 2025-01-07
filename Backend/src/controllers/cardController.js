const Card = require('../models/cardModel');
const CardService = require('../services/cardService');

const CardController = {
  // Fetch all sets and return in response
  getAllCards: async (req, res) => {
    try {
      const cards = await CardService.getAllCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllCardsById: async (req, res) => {
    try {
      const setId = req.body.setId;
      console.log("set id from cardController: " + setId);
      const cards = await CardService.getCardById(setId);
      res.json(cards);
      console.log("cards: " + cards[0].term);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  },

  addCard: async (req, res) => {
    try {
        console.log("rec body from card controller:")
        console.log(req.body); // This will help you see the incoming data
        const { setId, term, definition} = req.body; 
        if (!setId || !term || !definition) {
            throw new Error("Set ID, term, and definition are required");
        }

        const newCard = new Card({ set_id: setId, term: term, definition: definition });

        const cardId = await CardService.addCard(newCard);
        res.json({ cardId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

  deleteCard: async (req, res) => {
      try {
          console.log(req.body); // This will help you see the incoming data
          const { cardId, userId } = req.body; 
          if (!cardId || !userId) {
              throw new Error("cardId and userId are required");
          }

          const oldCard = new Card({ id: cardId, userId: userId});

          const oldCardId = await CardService.deleteCard(oldCard);
          res.json({ oldCardId });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  },

  updateCard: async (req, res) => {
    try {
        console.log("update Card:")
        console.log("rec body from card controller:")
        console.log(req.body); // This will help you see the incoming data
        const card = req.body; 
        if (!card) {
            throw new Error("Card Info is required");
        }
        const response = await CardService.updateCard(card);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CardController;
