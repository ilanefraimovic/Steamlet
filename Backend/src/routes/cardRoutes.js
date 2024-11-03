// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/', CardController.getAllCards);

router.post('/add', CardController.addCard);

router.delete('/delete', CardController.deleteCard);

module.exports = router;
