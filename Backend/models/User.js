// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  service: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  photo: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
