// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyGoogleToken = require('../middleware/verifyGoogleToken');

router.post('/signup', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', verifyGoogleToken, userController.loginUser);

module.exports = router;
