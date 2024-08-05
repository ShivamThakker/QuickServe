const mongoose = require('mongoose');

const ServiceSeekerSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
});

const ServiceSeeker = mongoose.model('ServiceSeeker', ServiceSeekerSchema);

module.exports = ServiceSeeker;
