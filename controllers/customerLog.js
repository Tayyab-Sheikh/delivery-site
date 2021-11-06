const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');

exports.customerlogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedCustomer;
  try{
  const customer = await Customer.findOne({ email: email });
        if (!customer) {
          const error = new Error('A Customer with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedCustomer = customer;
  const isEqual = await bcrypt.compare(password, customer.password);
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedCustomer.email,
            customerId: loadedCustomer._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, adminId: loadedCustomer._id.toString() });
      }catch(err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  };

  exports.getSchedule = async (req, res, next) => {
    const customerId = req.params.customerId;
    try{
    const customer = await Customer.findById(customerId);
        if (!customer) {
          const error = new Error('Could not find customer.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Customer fetched.', customer: customer.deliverySchedule });
      }catch(err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  };
  
  