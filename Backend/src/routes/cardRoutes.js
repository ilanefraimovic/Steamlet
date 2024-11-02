// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

// Example routes
router.get('/', CardController.getAllCards);

router.post('/', (req, res) => {
  res.json({ message: 'Create a new card' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user with ID: ${id}` });
});

module.exports = router;
