require('dotenv').config();
const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/buildmypc';
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    }).then((m) => {
      console.log('✅ MongoDB terhubung.');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error('❌ MongoDB Error:', err);
    throw err;
  }

  return cached.conn;
};

module.exports = { connectDB };