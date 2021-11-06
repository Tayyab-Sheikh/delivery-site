const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DeliveryBoy = require('../models/deliveryBoy');

exports.dBoylogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedDboy;
    try{
    const dBoy = await DeliveryBoy.findOne({ email: email });
        if (!dBoy) {
          const error = new Error('A Delivery-Boy with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedDboy = dBoy;
    const isEqual = await bcrypt.compare(password, dBoy.password);
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedDboy.email,
            dboyId: loadedDboy._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, adminId: loadedDboy._id.toString() });
        }catch(err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  };

  exports.getSchedule = async (req, res, next) => {
    const dBoyId = req.params.dBoyId;
    try{
    const deliveryBoy = await DeliveryBoy.findById(dBoyId);
        if (!deliveryBoy) {
          const error = new Error('Could not find delivery Boy.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'delivery Boy fetched.', customer: deliveryBoy.customers });
      }catch(err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  };