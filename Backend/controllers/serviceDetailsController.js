const ServiceDetailsDAO = require('../dao/ServiceDetailsDAO');

exports.createServiceRequest = async (req, res) => {
  const { service, city, date, time, userId } = req.body;
  try {
    const serviceDetails = await ServiceDetailsDAO.createServiceRequest({
      service,
      city,
      date,
      time,
      userId,
    });

    res.status(201).json(serviceDetails);
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getServiceDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceDetails = await ServiceDetailsDAO.getServiceDetailsById(id);
    res.status(200).json(serviceDetails);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(404).json({ message: error.message });
  }
}

exports.getServiceSummaries = async (req, res) => {
  const { userId } = req.query; // Assume userId is passed as a query parameter

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const serviceDetails = await ServiceDetailsDAO.getServiceSummaries(userId);
    res.status(200).json(serviceDetails);
  } catch (error) {
    console.error('Error retrieving service details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  exports.addSummary = async (req, res) => {
    const { serviceId, address, pricePerHour } = req.body;
    try {
      const summary = await ServiceDetailsDAO.addSummary({
        serviceId,
        address,
        pricePerHour,
      });
  
      res.status(201).json(summary);
    } catch (error) {
      console.error('Error adding summary:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  const { ObjectId } = require('mongodb');

exports.getCheckoutDetails = async (req, res) => {
  const { id } = req.params; // This should be the service ID

  // Validate ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid service ID format' });
  }

  try {
    // Fetch service details by ID
    const serviceDetails = await ServiceDetailsDAO.getServiceDetailsById(id);
    if (!serviceDetails) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Fetch summary details using the service ID
    const summaryDetails = await ServiceDetailsDAO.getSummaryByServiceId(id);
    if (!summaryDetails) {
      return res.status(404).json({ message: 'Summary not found' });
    }

    // Combine details
    const checkoutDetails = {
      ...serviceDetails,
      ...summaryDetails,
    };

    res.status(200).json(checkoutDetails);
  } catch (error) {
    console.error('Error fetching checkout details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
