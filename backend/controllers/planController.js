const data = require('../models/data');

// Get all membership plans
const getAllPlans = (req, res) => {
  try {
    res.json({
      success: true,
      data: data.plans,
      count: data.plans.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching plans', error: error.message });
  }
};

// Get plan by ID
const getPlanById = (req, res) => {
  try {
    const plan = data.plans.find(p => p.id === parseInt(req.params.id));
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching plan', error: error.message });
  }
};

module.exports = {
  getAllPlans,
  getPlanById
};
