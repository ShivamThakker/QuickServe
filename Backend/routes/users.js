// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyGoogleToken = require('../middleware/verifyGoogleToken');
const multer = require('multer');


router.post('/signup', userController.upload, userController.createUser);
router.get('/user/:googleId', userController.getUserDetails);
router.post('/login', verifyGoogleToken, userController.loginUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
