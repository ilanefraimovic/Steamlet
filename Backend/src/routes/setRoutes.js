// src/routes/setRoutes.js
const express = require('express');
const router = express.Router();
const setController = require('../controllers/setController');

// Example routes
router.get('/', setController.getAllSets);

router.post('/createSet', (req, res) => {
  res.json({ message: 'Create a new set' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get set with ID: ${id}` });
});

module.exports = router;
