const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Admin = require('../models/admin');
const Customer = require('../models/customer');
const DeliveryBoy = require('../models/deliveryBoy');


exports.addAdmin = async (req,res,next) =>{
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
}
const email = req.body.email;
const password = req.body.password;
const name = req.body.name;
try{
const hashpasword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      email: email,
      password: hashpasword,
      name: name
    });
const result = await admin.save();
  res.status(201).json({ message: 'Admin created!'});
  }catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.adminlogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedAdmin;
  try{
  const admin = await Admin.findOne({ email: email });
      if (!admin) {
        const error = new Error('An Admin with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedAdmin = admin;
  const isEqual = await bcrypt.compare(password, admin.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedAdmin.email,
          adminId: loadedAdmin._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, adminId: loadedAdmin._id.toString() });
    }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.getCustomers = async (req,res,next) =>{
    const currentPage = req.body.page || 1;
    const perPage = 2;
    let total;
    try{
    const count = await Customer.find().countDocuments();
        total = count;
    const customers = await Customer.find().skip(
            (currentPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json({
            message: 'Customers are Here',
            customers: customers,
            total:total
        });
      }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addCustomer = async (req,res,next) =>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const contact = req.body.contact;
  const deliverySchedule = req.body.deliverySchedule;
  const  payOutType = req.body.payOutType;
  try{
  const hashpasword = await bcrypt.hash(password, 12);
  const customer = new Customer({
        email: email,
        password: hashpasword,
        name: name,
        address:address,
        contact:contact,
        deliverySchedule: deliverySchedule,
        payOutType: payOutType
  });
      const result = await customer.save();
      res.status(201).json({ message: 'Customer created!', customerId: result._id });
  }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.getDeliveryBoys = async (req,res,next) =>{
  const currentPage = req.body.page || 1;
  const perPage = 2;
  let total;
  try{
  const count = await DeliveryBoy.find().countDocuments();
      total = count;
  const dBoys = await DeliveryBoy.find().skip(
          (currentPage - 1) * perPage)
          .limit(perPage);
      res.status(200).json({
          message: 'Delivery Boys are Here',
          dBoys: dBoys,
          total:total
      });
    }catch(err){
      if(!err.statusCode){
          err.statusCode = 500;
      }
      next(err);
  }
};

exports.addDeliveryBoy = async (req,res,next) =>{
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
}
const email = req.body.email;
const password = req.body.password;
const name = req.body.name;
const address = req.body.address;
const contact = req.body.contact;
const salaryPackage = req.body.salaryPackage;
const salary = req.body.salary;
try{
const hashpasword = await bcrypt.hash(password, 12);
    const dBoy = new DeliveryBoy({
      email: email,
      password: hashpasword,
      name: name,
      address:address,
      contact:contact,
      salaryPackage:salaryPackage,
      salary:salary
    });
  const result = await dBoy.save();
  res.status(201).json({ message: 'Delivery Boy created!', dBoyId: result._id });
  }catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};  

exports.updateCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const contact = req.body.contact;
  const deliverySchedule = req.body.deliverySchedule;
  const  payOutType = req.body.payOutType;
  try{
  const customer = await Customer.findById(customerId);
      if (!customer) {
        const error = new Error('Could not find customer.');
        error.statusCode = 404;
        throw error;
      }
      if (customer.creator.toString() !== req.adminId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      customer.email = email;
      customer.password = password;
      customer.name = name;
      customer.address = address;
      customer.contact = contact;
      customer.deliverySchedule = deliverySchedule;
      customer.payOutType = payOutType;
    const result = await customer.save();
      res.status(200).json({ message: 'Customer updated!', customer: result });
    }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.deleteCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  try{
  const customer = await Customer.findById(customerId);
      if (!customer) {
        const error = new Error('Could not find customer.');
        error.statusCode = 404;
        throw error;
      }
      if (customer.creator.toString() !== req.adminId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // Check logged in customer
  const result = await Customer.findByIdAndRemove(customerId);
    const admin = await Customer.findById(req.adminId);
      admin.customers.pull(customerId);
    const user =  admin.save();
      res.status(200).json({ message: 'Deleted customer.' });
    }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};