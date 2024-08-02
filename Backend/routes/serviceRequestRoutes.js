// routes/serviceRequests.js
const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');
const verifyGoogleToken = require('../middleware/verifyGoogleToken'); // Assuming you have this middleware

router.post('/service-requests', verifyGoogleToken, serviceRequestController.createServiceRequest);
router.get('/service-requests', verifyGoogleToken, serviceRequestController.getServiceRequests);

module.exports = router;
