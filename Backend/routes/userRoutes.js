// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/signup', async (req, res) => {
  const { name, phoneNumber, email, service, hourlyRate, photoUrl } = req.body;

  try {
    const newUser = new User({ name, phoneNumber, email, service, hourlyRate, photoUrl });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
