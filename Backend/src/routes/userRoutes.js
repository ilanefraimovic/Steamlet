// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Example routes
router.get('/', UserController.getAllUsers);

router.post('/', (req, res) => {
  res.json({ message: 'Create a new user' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user with ID: ${id}` });
});

module.exports = router;
