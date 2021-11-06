const express = require('express');
const {body} = require('express-validator/check');

const dBoyController = require('../controllers/dBoyLog');

const router = express.Router();

router.post('/dBoylogin', dBoyController.dBoylogin);

router.get('/checkSchedule', dBoyController.getSchedule);

module.exports = router;
