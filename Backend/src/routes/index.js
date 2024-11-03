// src/routes/index.js
const express = require('express');
const router = express.Router();

// Import other route files (if any)
const userRoutes = require('./userRoutes');
const setRoutes = require('./setRoutes');
const cardRoutes = require('./cardRoutes');

// Use the imported routes
// All routes will be prefixed with /api/v1
router.use('/users', userRoutes);
router.use('/sets', setRoutes); 
router.use('/cards', cardRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = router;
