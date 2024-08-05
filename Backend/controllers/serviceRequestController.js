// const serviceRequestDao = require('../dao/ServiceRequestDao');
const serviceRequestDao = require('../dao/ServiceDAO.js');
exports.createServiceRequest = async (req, res) => {
  const { service, location, date, time } = req.body;
  const userId = req.user._id; // assuming req.user is populated by authentication middleware

  try {
    const newServiceRequest = await serviceRequestDao.createServiceRequest({
      service,
      location,
      date,
      time,
      user: userId,
    });
    res.status(201).json(newServiceRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await serviceRequestDao.getServiceRequestsByUserId(req.user._id);
    res.status(200).json(serviceRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
