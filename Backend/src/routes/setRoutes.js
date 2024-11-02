// src/routes/setRoutes.js
const express = require('express');
const router = express.Router();
const SetController = require('../controllers/setController');

// Example routes
router.get('/', SetController.getAllSets);

router.get('/:id', SetController.getAllSets);

router.post('/create', SetController.createSet);

router.put('/update/:id', SetController.updateSet);

router.delete('/delete/:id', SetController.deleteSet);

module.exports = router;
