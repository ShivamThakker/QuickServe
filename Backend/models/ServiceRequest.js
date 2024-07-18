// models/ServiceRequest.js

const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  service: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String },
  pricePerHour: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
