const data = require('../models/data');

// Get dashboard statistics
const getDashboardStats = (req, res) => {
  try {
    // Calculate statistics
    const totalMembers = data.members.length;
    const activeMembers = data.members.filter(m => m.status === 'Active').length;
    const todayClasses = data.classes.length; // In a real app, would filter by today
    
    // Calculate total revenue from active members
    const totalRevenue = data.members
      .filter(m => m.status === 'Active')
      .reduce((sum, member) => {
        const plan = data.plans.find(p => p.id === member.planId);
        return sum + (plan ? plan.price : 0);
      }, 0);

    // Get today's classes (for simplicity, returning all classes)
    const todayClassList = data.classes.slice(0, 3); // Top 3 classes

    // Get recent members (last 5)
    const recentMembers = data.members.slice(-5).reverse();

    const stats = {
      totalMembers,
      activeMembers,
      todayClasses,
      totalRevenue: totalRevenue.toFixed(2),
      todayClassList,
      recentMembers,
      totalTrainers: data.trainers.length,
      totalPlans: data.plans.length
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard stats', error: error.message });
  }
};

module.exports = {
  getDashboardStats
};
