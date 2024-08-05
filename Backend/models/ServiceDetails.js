const mongoose = require('mongoose');

const ServiceDetailsSchema = new mongoose.Schema({
  service: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: String, required: true },
});

const ServiceDetails = mongoose.model('ServiceDetails', ServiceDetailsSchema);

module.exports = ServiceDetails;
