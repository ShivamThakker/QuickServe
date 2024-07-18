const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { googleId, name, phoneNumber, email, service, hourlyRate, photo } = req.body;
  console.log("Signup request received:", req.body); // Log the entire request body

  if (!googleId) {
    return res.status(400).json({ error: "googleId is required" });
  }

  try {
    const newUser = new User({
      googleId,
      name,
      phoneNumber,
      email,
      service,
      hourlyRate,
      photo,
    });
    await newUser.save();
    console.log("User created successfully:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { googleId, name, email, picture } = req.user;
  console.log("Login request received:", req.user); // Log the entire user object

  if (!googleId) {
    return res.status(400).json({ error: "googleId is required" });
  }

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        name,
        email,
        picture,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
