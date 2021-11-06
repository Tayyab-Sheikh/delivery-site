const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const dBoyRoutes = require('./routes/deliveryBoy');
const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/deliveryBoy', dBoyRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


mongoose.connect(
    "mongodb+srv://webTech:Sheikh44@cluster0.tgtfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).then(rsult =>{
    app.listen(3000);
}).catch(err =>{
    console.log(err);
})