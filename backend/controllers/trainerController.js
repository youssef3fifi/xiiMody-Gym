const data = require('../models/data');

// Get all trainers
const getAllTrainers = (req, res) => {
  try {
    res.json({
      success: true,
      data: data.trainers,
      count: data.trainers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trainers', error: error.message });
  }
};

// Get trainer by ID
const getTrainerById = (req, res) => {
  try {
    const trainer = data.trainers.find(t => t.id === parseInt(req.params.id));
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trainer', error: error.message });
  }
};

// Create new trainer
const createTrainer = (req, res) => {
  try {
    const { name, specialty, experience, email, phone, certifications } = req.body;
    
    // Validation
    if (!name || !specialty || !experience || !email) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if email already exists
    const existingTrainer = data.trainers.find(t => t.email === email);
    if (existingTrainer) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newTrainer = {
      id: data.getNextTrainerId(),
      name,
      specialty,
      experience,
      email,
      phone: phone || '',
      certifications: certifications || []
    };

    data.trainers.push(newTrainer);
    res.status(201).json({ success: true, message: 'Trainer created successfully', data: newTrainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating trainer', error: error.message });
  }
};

// Update trainer
const updateTrainer = (req, res) => {
  try {
    const trainerIndex = data.trainers.findIndex(t => t.id === parseInt(req.params.id));
    if (trainerIndex === -1) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    const { name, specialty, experience, email, phone, certifications } = req.body;
    
    // Check if email is being changed and if it already exists
    if (email && email !== data.trainers[trainerIndex].email) {
      const existingTrainer = data.trainers.find(t => t.email === email);
      if (existingTrainer) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    // Update trainer data
    data.trainers[trainerIndex] = {
      ...data.trainers[trainerIndex],
      name: name || data.trainers[trainerIndex].name,
      specialty: specialty || data.trainers[trainerIndex].specialty,
      experience: experience || data.trainers[trainerIndex].experience,
      email: email || data.trainers[trainerIndex].email,
      phone: phone !== undefined ? phone : data.trainers[trainerIndex].phone,
      certifications: certifications || data.trainers[trainerIndex].certifications
    };

    res.json({ success: true, message: 'Trainer updated successfully', data: data.trainers[trainerIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating trainer', error: error.message });
  }
};

// Delete trainer
const deleteTrainer = (req, res) => {
  try {
    const trainerIndex = data.trainers.findIndex(t => t.id === parseInt(req.params.id));
    if (trainerIndex === -1) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    const deletedTrainer = data.trainers.splice(trainerIndex, 1)[0];
    res.json({ success: true, message: 'Trainer deleted successfully', data: deletedTrainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting trainer', error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer
};
