// Configuration for backend server
module.exports = {
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || '*',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
