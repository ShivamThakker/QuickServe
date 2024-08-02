// controllers/serviceRequestController.js
const ServiceRequest = require('../models/ServiceRequest');

exports.createServiceRequest = async (req, res) => {
  const { service, location, date, time } = req.body;
  const userId = req.user._id; // assuming req.user is populated by authentication middleware

  try {
    const newServiceRequest = new ServiceRequest({
      service,
      location,
      date,
      time,
      user: userId,
    });
    await newServiceRequest.save();
    res.status(201).json(newServiceRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({ user: req.user._id });
    res.status(200).json(serviceRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
