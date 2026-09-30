require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/buildmypc';
    await mongoose.connect(uri);
    console.log('✅ MongoDB terhubung.');
  } catch (err) {
    console.error('❌ MongoDB Error:', err);
  }
};
module.exports = { connectDB };