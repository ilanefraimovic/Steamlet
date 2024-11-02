const CardService = require('../services/cardService');

const CardController = {
  // Fetch all sets and return in response
  getAllSets: async (req, res) => {
    try {
      const cards = await CardService.getAllCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Other controller methods...
};

module.exports = CardController;
