const SetService = require('../services/setService');

const SetController = {
  // Fetch all sets and return in response
  getAllSets: async (req, res) => {
    try {
      const sets = await SetService.getAllSets();
      res.json(sets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSets: async (req, res) => {
    try {

        console.log(req.body);
        const {name, create_date} = req.body;
        if(!name || !create_date){
            throw new Error("name and date are required");
        }

        const sets = await SetService.createSet(new Set({name: name, create_date: create_date}));
        // res.json(users);
        res.json(sets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SetController;
