// API Configuration
// Change this to your EC2 instance IP address when deploying
// Example: const API_URL = 'http://3.85.123.45:3000';
const API_URL = 'http://localhost:3000';

// API endpoints
const API_ENDPOINTS = {
  members: `${API_URL}/api/members`,
  trainers: `${API_URL}/api/trainers`,
  classes: `${API_URL}/api/classes`,
  plans: `${API_URL}/api/plans`,
  dashboard: `${API_URL}/api/dashboard/stats`,
  health: `${API_URL}/api/health`
};
