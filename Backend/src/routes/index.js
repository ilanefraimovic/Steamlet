// src/routes/index.js
const express = require('express');
const router = express.Router();

// Import other route files (if any)
const userRoutes = require('./userRoutes'); // Example for user-related routes

// Use the imported routes
router.use('/users', userRoutes); // All user routes will be prefixed with /api/users

// Root endpoint
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = router;
