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
};
