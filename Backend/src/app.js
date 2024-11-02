require('dotenv').config(); // Loads environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes'); 

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded request bodies
app.use(morgan('dev')); // Logs requests to the console in development

// Routes
app.use('/api/v1', routes); // Use /api as the base path for all routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
