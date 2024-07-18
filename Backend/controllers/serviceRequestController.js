// controllers/serviceRequestController.js

const ServiceRequest = require('../models/ServiceRequest');

exports.createServiceRequest = async (req, res) => {
  const { service, city, date, time, userId } = req.body;

  try {
    const newServiceRequest = new ServiceRequest({ service, city, date, time, userId });
    await newServiceRequest.save();
    res.status(201).json(newServiceRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({ userId: req.params.userId });
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateServiceRequest = async (req, res) => {
  const { id } = req.params;
  const { address, pricePerHour } = req.body;

  try {
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { address, pricePerHour },
      { new: true }
    );

    if (!updatedServiceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    res.status(200).json(updatedServiceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
