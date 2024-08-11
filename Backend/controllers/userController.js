const UserDAO = require('../dao/UserDAO');
const ServiceDAO = require('../dao/ServiceDAO')
const OAuth2Client = require('google-auth-library');
const multer = require('multer');
const path = require('path');
const ServiceSeeker = require('../models/ServiceSeeker');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('photo');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.upload = upload;

exports.createUser = async (req, res) => {
  const { name, phoneNumber, email, service, hourlyRate } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const newUser = await UserDAO.createUser({
      name,
      phoneNumber,
      email,
      service,
      hourlyRate,
      photo,
    });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ error: "User with this email id already registered" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserDAO.getAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
  }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
}

exports.getUserDetails = async (req, res) => {
  const { googleId } = req.params; // Assuming googleId is passed as a route parameter

  try {
    const user = await ServiceDAO.findServiceSeekerByGoogleId(googleId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { googleId, name, email, picture } = req.body;

  try {

    let user = await ServiceDAO.findServiceSeekerByGoogleId(googleId);

    // If the user doesn't exist, create a new one using ServiceDAO
    if (!user) {
      user = await ServiceDAO.createServiceSeeker({ googleId, name, email, picture });
    }

    // user = response.data;
    // localStorage.setItem('user', JSON.stringify(user));
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
