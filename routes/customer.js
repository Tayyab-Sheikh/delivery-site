const express = require('express');
const {body} = require('express-validator/check');

const customerController = require('../controllers/customerLog');

const router = express.Router();

router.post('/customerlogin', customerController.customerlogin);

router.get('/deliverySchedule', customerController.getSchedule);

module.exports = router;