// src/services/userService.js
const SetRepository = require('../dataAccess/setRepository');

const SetService = {
  getAllSets: async () => {
    try {
      const sets = await   SetRepository.getAllSets();
      return sets;
    } catch (error) {
      throw error;
    }
  },

  getSetById: async (id) => {
    try {
      const set = await SetRepository.getSetById(id);
      if (!set) throw new Error('Set not found');
      return user;
    } catch (error) {
      throw error;
    }
  },

  createSet: async (setData) => {
    try {
      const newSetId = await SetRepository.createUser(setData);
      return newSetId;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = SetService;
