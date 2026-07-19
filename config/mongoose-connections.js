require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not defined. Falling back to local MongoDB at mongodb://127.0.0.1:27017/ecommerce.');
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Database is connected successfully to ${mongoUri}`);
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
    process.exit(1);
  });

module.exports = mongoose.connection;