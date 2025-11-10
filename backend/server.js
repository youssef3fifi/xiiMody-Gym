const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes
const memberRoutes = require('./routes/members');
const trainerRoutes = require('./routes/trainers');
const classRoutes = require('./routes/classes');
const planRoutes = require('./routes/plans');
const dashboardRoutes = require('./routes/dashboard');

// API routes
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'XiiMody Gym Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Welcome to XiiMody Gym Management API',
    version: '1.0.0',
    endpoints: {
      members: '/api/members',
      trainers: '/api/trainers',
      classes: '/api/classes',
      plans: '/api/plans',
      dashboard: '/api/dashboard/stats',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: config.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`XiiMody Gym Management API Server`);
  console.log(`Environment: ${config.NODE_ENV}`);
  console.log(`Port: ${PORT}`);
  console.log(`Frontend URL: ${config.FRONTEND_URL}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
  console.log('='.repeat(50));
});

module.exports = app;
