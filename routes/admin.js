const express = require('express');
const {body} = require('express-validator/check');

const Admin = require('../models/admin');
const Customer = require('../models/customer');
const DeliveryBoy = require('../models/deliveryBoy');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/auth');

const router = express.Router();

router.put(
  '/addAdmin',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Customer.findOne({ email: value }).then(customerDoc => {
          if (customerDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  adminController.addAdmin
);

router.post('/adminlogin', adminController.adminlogin);

router.put(
    '/addCustomer',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          return Customer.findOne({ email: value }).then(customerDoc => {
            if (customerDoc) {
              return Promise.reject('E-Mail address already exists!');
            }
          });
        })
        .normalizeEmail(),
      body('password')
        .trim()
        .isLength({ min: 5 }),
      body('name')
        .trim()
        .not()
        .isEmpty(),
      body('address')
        .trim()
        .not()
        .isEmpty(),
      body('contact')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 7 }),
      body('deliverySchedule')
        .trim()
        .not()
        .isEmpty(),
      body(' payOutType')
        .trim()
        .not()
        .isEmpty()
    ],
    adminController.addCustomer
  );

  router.get('/customers',isAuth, adminController.getCustomers);

  router.put(
    '/addDeliveryBoy',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          return DeliveryBoy.findOne({ email: value }).then(dBoyDoc => {
            if (dBoyDoc) {
              return Promise.reject('E-Mail address already exists!');
            }
          });
        })
        .normalizeEmail(),
      body('password')
        .trim()
        .isLength({ min: 5 }),
      body('name')
        .trim()
        .not()
        .isEmpty(),
      body('address')
        .trim()
        .not()
        .isEmpty(),
      body('contact')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 7 }),
      body('salaryPackage')
        .trim()
        .not()
        .isEmpty(),
      body('salary')
        .trim()
        .not()
        .isEmpty()
    ],
    adminController.addDeliveryBoy
  );

  router.get('/delivery-boys',isAuth, adminController.getDeliveryBoys);
  
  router.put(
    '/customer/:customerId',
    isAuth,
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          return Customer.findOne({ email: value }).then(customerDoc => {
            if (customerDoc) {
              return Promise.reject('E-Mail address already exists!');
            }
          });
        })
        .normalizeEmail(),
      body('password')
        .trim()
        .isLength({ min: 5 }),
      body('name')
        .trim()
        .not()
        .isEmpty(),
      body('address')
        .trim()
        .not()
        .isEmpty(),
      body('contact')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 7 }),
      body('deliverySchedule')
        .trim()
        .not()
        .isEmpty(),
      body(' payOutType')
        .trim()
        .not()
        .isEmpty()
    ],
   
    adminController.updateCustomer
  );

  router.delete('/customer/:customerId' , isAuth , adminController.deleteCustomer);

  module.exports = router;