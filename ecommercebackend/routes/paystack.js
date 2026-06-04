const express = require('express');
const router = express.Router();
const { initializePaystack, paystackWebhook } = require('../controllers/paystackController');

router.post('/initialize', initializePaystack);

// Paystack webhook should be mounted as raw body.
router.post('/webhook', paystackWebhook);

module.exports = router;

