// src/controllers/setController.js
const SetService = require('../services/setService');
const Set = require('../models/setModel');

const SetController = {
    // Fetch all sets
    getAllSets: async (req, res) => {
        try {
            const sets = await SetService.getAllSets();
            res.json(sets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSetById: async (req, res) => {
        try {
            const setId = req.params.id;
            const set = await SetService.getSetById(setId);

            if (!set) {
                return res.status(404).json({ error: "Set not found" });
            }

            res.json(set);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createSet: async (req, res) => {
        try {
            console.log(req.body); // This will help you see the incoming data
            const { user_id, name } = req.body; // Ensure you extract user_id as well
            if (!user_id || !name) {
                throw new Error("User ID and name are required");
            }
    
            const newSet = new Set({ user_id, name });
            console.log(newSet)
            const setId = await SetService.createSet(newSet);
            res.json({ setId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateSet: async (req, res) => {
        try {
            const updatedData = req.body;
            const rowsUpdated = await SetService.updateSet(updatedData);
            console.log(updatedData);
            if (rowsUpdated === 0) {
                return res.status(404).json({ error: "Set not found or no changes made" });
            }
    
            res.json({ message: "Set updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteSet: async (req, res) => {
        try {
            const { setId } = req.body;
    
            if(!setId){
                throw new Error("SetId is required");
            }
                
            const id = await SetService.deleteSet(new Set({id: setId}));
            res.json(id);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
      }
    

};    

module.exports = SetController;
