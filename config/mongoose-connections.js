require('dotenv').config();
const mongoose = require('mongoose');
const dbgr = require("debug")("devlopment:mongoose")

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not defined. Falling back to local MongoDB at mongodb://127.0.0.1:27017/ecommerce.');
}

mongoose.connect(mongoUri)
  .then(() => {
    dbgr(`Database is connected successfully to ${mongoUri}`);
  })
  .catch((err) => {
    dbgr('Error connecting to database', err);
    process.exit(1);
  });

module.exports = mongoose.connection;

// debug pring karne ke liye hame use karna bade ga windows me h to set debug=devlopment:* aru mac me hto expoet
