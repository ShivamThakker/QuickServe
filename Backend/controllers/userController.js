const User = require('../models/User');
const ServiceSeeker = require('../models/ServiceSeeker');
const multer = require('multer');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

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

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// exports.loginUser = async (req, res) => {
//   const { googleId, name, email, picture } = req.body;

//   try {
//     let user = await ServiceSeeker.findOne({ googleId });

//     if (!user) {
//       user = new ServiceSeeker({
//         googleId,
//         name,
//         email,
//         picture,
//       });
//       await user.save();
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.loginUser = async (req, res) => {
  console.log("Login request received:", req.body); // Debug: Log the login request

  const { googleId, name, email, picture } = req.body;

  try {
    let user = await ServiceSeeker.findOne({ googleId });
    console.log("User found:", user); // Debug: Log if the user is found

    if (!user) {
      console.log("User not found, creating new user"); // Debug: Log if the user is not found
      user = new ServiceSeeker({
        googleId,
        name,
        email,
        picture,
      });
      await user.save();
      console.log("New user created:", user); // Debug: Log the new user created
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Server error:', error); // Debug: Log any server error
    res.status(500).json({ message: 'Server error' });
  }
};
