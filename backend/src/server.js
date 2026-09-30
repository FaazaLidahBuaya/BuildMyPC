require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());

// Ensure MongoDB is connected before handling any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: err.message,
      hint: !process.env.MONGO_URI ? 'MONGO_URI is missing in Vercel Environment Variables' : undefined
    });
  }
});

// Root friendly route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'BuildMyPC API',
    endpoints: {
      health: '/api/health',
      components: '/api/components?category=CPU',
      presets: '/api/components/preset/entry'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'BuildMyPC API MongoDB (Vercel Ready)',
    hasMongoUri: !!process.env.MONGO_URI,
    mongoState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/components', require('./routes/components'));
app.use('/api/builds', require('./routes/builds'));
app.use('/api/compatibility', require('./routes/compatibility'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log('Server running on ' + PORT));
}

module.exports = app;