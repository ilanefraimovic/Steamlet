// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getAllUsers);

router.post('/login', UserController.loginUser);

router.post('/create', UserController.createUser);

router.delete('/delete', UserController.deleteUser);
module.exports = router;
