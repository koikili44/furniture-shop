const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const paystackRoutes = require('./routes/paystack');

const app = express();


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Paystack webhook needs the raw body for signature verification.
// NOTE: This middleware must run *before* the webhook route.
// We skip parsing to avoid consuming the stream twice.
app.use('/api/v1/paystack/webhook', (req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    req.rawBody = Buffer.from(data, 'utf8');
    try {
      req.body = data ? JSON.parse(data) : undefined;
    } catch {
      req.body = undefined;
    }
    next();
  });
});



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/paystack', paystackRoutes);
// Health check route

app.get('/api/v1/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const statusCode = dbState === 'connected' ? 200 : 500;

  res.status(statusCode).json({
    status: dbState === 'connected' ? 'ok' : 'error',
    environment: process.env.NODE_ENV,
    database: dbState,
    port: process.env.PORT || 5000
  });
});



// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
