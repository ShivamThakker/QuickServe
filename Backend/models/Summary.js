// models/Summary.js
const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceDetails' },
  address: { type: String, required: true },
  pricePerHour: { type: Number, required: true }
});

const Summary = mongoose.model('Summary', SummarySchema);

module.exports = Summary;
