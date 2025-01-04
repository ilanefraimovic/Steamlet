// src/services/setService.js
const SetRepository = require('../dataAccess/setRepository');

const SetService = {
    getAllSets: async () => {
        try {
            const sets = await SetRepository.getAllSets();
            return sets;
        } catch (error) {
            throw error;
        }
    },

    getSetById: async (id) => {
        try {
            const set = await SetRepository.getSetById(id);
            if (!set) throw new Error('Set not found');
            return set; // Fixed typo here
        } catch (error) {
            throw error;
        }
    },

    getSetsByuserId: async (userId) => {
        try {
            const sets = SetRepository.getSetsByUserId(userId);
            if (!sets) throw new Error('Sets not found');
            return sets;
        } catch (error) {
            throw error;
        }
    },

    createSet: async (setData) => {
        try {
            const newSetId = await SetRepository.createSet(setData);
            return newSetId;
        } catch (error) {
            throw error;
        }
    },


    updateSet: async ( updatedData) => {
      try {
          const rowsUpdated = await SetRepository.updateSet( updatedData);
          return rowsUpdated;
      } catch (error) {
          throw error;
      }
  },

  deleteSet: async (setData) => {
    try {
        const rowsDeleted  = await SetRepository.deleteSet(setData);
        if (!rowsDeleted) throw new Error('Set Not Found');
        return rowsDeleted;
    } catch (error) {
        throw error;
    }
}
};

module.exports = SetService;
