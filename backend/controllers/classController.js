const data = require('../models/data');

// Get all classes
const getAllClasses = (req, res) => {
  try {
    res.json({
      success: true,
      data: data.classes,
      count: data.classes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching classes', error: error.message });
  }
};

// Get class by ID
const getClassById = (req, res) => {
  try {
    const classItem = data.classes.find(c => c.id === parseInt(req.params.id));
    if (!classItem) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    res.json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching class', error: error.message });
  }
};

// Create new class
const createClass = (req, res) => {
  try {
    const { name, trainerId, trainerName, time, duration, capacity, days } = req.body;
    
    // Validation
    if (!name || !trainerId || !time || !duration || !capacity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Verify trainer exists
    const trainer = data.trainers.find(t => t.id === parseInt(trainerId));
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    const newClass = {
      id: data.getNextClassId(),
      name,
      trainerId: parseInt(trainerId),
      trainerName: trainerName || trainer.name,
      time,
      duration,
      capacity: parseInt(capacity),
      enrolled: 0,
      days: days || []
    };

    data.classes.push(newClass);
    res.status(201).json({ success: true, message: 'Class created successfully', data: newClass });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating class', error: error.message });
  }
};

// Update class
const updateClass = (req, res) => {
  try {
    const classIndex = data.classes.findIndex(c => c.id === parseInt(req.params.id));
    if (classIndex === -1) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const { name, trainerId, trainerName, time, duration, capacity, enrolled, days } = req.body;
    
    // If trainer is being changed, verify they exist
    if (trainerId && trainerId !== data.classes[classIndex].trainerId) {
      const trainer = data.trainers.find(t => t.id === parseInt(trainerId));
      if (!trainer) {
        return res.status(404).json({ success: false, message: 'Trainer not found' });
      }
    }

    // Update class data
    data.classes[classIndex] = {
      ...data.classes[classIndex],
      name: name || data.classes[classIndex].name,
      trainerId: trainerId ? parseInt(trainerId) : data.classes[classIndex].trainerId,
      trainerName: trainerName || data.classes[classIndex].trainerName,
      time: time || data.classes[classIndex].time,
      duration: duration || data.classes[classIndex].duration,
      capacity: capacity ? parseInt(capacity) : data.classes[classIndex].capacity,
      enrolled: enrolled !== undefined ? parseInt(enrolled) : data.classes[classIndex].enrolled,
      days: days || data.classes[classIndex].days
    };

    res.json({ success: true, message: 'Class updated successfully', data: data.classes[classIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating class', error: error.message });
  }
};

// Delete class
const deleteClass = (req, res) => {
  try {
    const classIndex = data.classes.findIndex(c => c.id === parseInt(req.params.id));
    if (classIndex === -1) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const deletedClass = data.classes.splice(classIndex, 1)[0];
    res.json({ success: true, message: 'Class deleted successfully', data: deletedClass });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting class', error: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};
