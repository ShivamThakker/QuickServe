const express = require('express');
const serviceDetailsController = require('../controllers/serviceDetailsController');

const router = express.Router();

router.post('/service-requests', serviceDetailsController.createServiceRequest);
router.get('/service-details/:id', serviceDetailsController.getServiceDetailsById);
router.get('/service-summaries', serviceDetailsController.getServiceSummaries);
router.post('/summary', serviceDetailsController.addSummary);
router.get('/checkout/:id', serviceDetailsController.getCheckoutDetails);

module.exports = router;
