const data = require('../models/data');

// Get all members
const getAllMembers = (req, res) => {
  try {
    res.json({
      success: true,
      data: data.members,
      count: data.members.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching members', error: error.message });
  }
};

// Get member by ID
const getMemberById = (req, res) => {
  try {
    const member = data.members.find(m => m.id === parseInt(req.params.id));
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching member', error: error.message });
  }
};

// Create new member
const createMember = (req, res) => {
  try {
    const { name, email, phone, membershipPlan, planId } = req.body;
    
    // Validation
    if (!name || !email || !phone || !membershipPlan) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if email already exists
    const existingMember = data.members.find(m => m.email === email);
    if (existingMember) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newMember = {
      id: data.getNextMemberId(),
      name,
      email,
      phone,
      membershipPlan,
      planId: planId || 1,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    data.members.push(newMember);
    res.status(201).json({ success: true, message: 'Member created successfully', data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating member', error: error.message });
  }
};

// Update member
const updateMember = (req, res) => {
  try {
    const memberIndex = data.members.findIndex(m => m.id === parseInt(req.params.id));
    if (memberIndex === -1) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const { name, email, phone, membershipPlan, planId, status } = req.body;
    
    // Check if email is being changed and if it already exists
    if (email && email !== data.members[memberIndex].email) {
      const existingMember = data.members.find(m => m.email === email);
      if (existingMember) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    // Update member data
    data.members[memberIndex] = {
      ...data.members[memberIndex],
      name: name || data.members[memberIndex].name,
      email: email || data.members[memberIndex].email,
      phone: phone || data.members[memberIndex].phone,
      membershipPlan: membershipPlan || data.members[memberIndex].membershipPlan,
      planId: planId || data.members[memberIndex].planId,
      status: status || data.members[memberIndex].status
    };

    res.json({ success: true, message: 'Member updated successfully', data: data.members[memberIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating member', error: error.message });
  }
};

// Delete member
const deleteMember = (req, res) => {
  try {
    const memberIndex = data.members.findIndex(m => m.id === parseInt(req.params.id));
    if (memberIndex === -1) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const deletedMember = data.members.splice(memberIndex, 1)[0];
    res.json({ success: true, message: 'Member deleted successfully', data: deletedMember });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting member', error: error.message });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
