require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/database');

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());

connectDB(); // Non-blocking for Vercel

app.use('/api/components', require('./routes/components'));
app.use('/api/builds', require('./routes/builds'));
app.use('/api/compatibility', require('./routes/compatibility'));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'BuildMyPC API MongoDB (Vercel Ready)' }));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log('Server running on ' + PORT));
}
module.exports = app;