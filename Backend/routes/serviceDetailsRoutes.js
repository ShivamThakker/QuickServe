const express = require('express');
const serviceDetailsController = require('../controllers/serviceDetailsController');

const router = express.Router();

router.post('/service-requests', serviceDetailsController.createServiceRequest);
router.get('/service-summaries', serviceDetailsController.getServiceSummaries);

module.exports = router;
