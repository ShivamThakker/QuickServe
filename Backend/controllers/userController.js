const User = require('../models/User');
const multer = require('multer');
const path = require('path');

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
  console.log("Signup request received:", req.body); // Log the entire request body

  try {
    const newUser = new User({
      name,
      phoneNumber,
      email,
      service,
      hourlyRate,
      photo,
    });
    await newUser.save();
    console.log("User created successfully:", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ error: "User with this email id already registered" });
    }
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
