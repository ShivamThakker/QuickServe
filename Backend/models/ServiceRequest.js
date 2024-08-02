// models/ServiceRequest.js
const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  service: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceSeeker', required: true },
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
