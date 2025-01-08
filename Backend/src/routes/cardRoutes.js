// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/', CardController.getAllCards);

router.post('/userCards', CardController.getAllCardsById);

router.post('/add', CardController.addCard);

router.delete('/delete/:cardId', CardController.deleteCard);

router.put('/update', CardController.updateCard);

module.exports = router;
