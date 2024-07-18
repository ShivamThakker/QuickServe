// routes/serviceRequestRoutes.js

const express = require('express');
const { createServiceRequest, getServiceRequests, updateServiceRequest } = require('../controllers/serviceRequestController');

const router = express.Router();

router.post('/', createServiceRequest);
router.get('/:userId', getServiceRequests);
router.put('/:id', updateServiceRequest);

module.exports = router;
