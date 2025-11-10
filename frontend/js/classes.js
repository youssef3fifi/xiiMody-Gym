// Classes page functionality

let allClasses = [];
let allTrainers = [];

// Load classes
async function loadClasses() {
  try {
    const response = await classesAPI.getAll();
    
    if (response.success) {
      allClasses = response.data;
      displayClasses(allClasses);
    }
  } catch (error) {
    console.error('Error loading classes:', error);
    showError('Failed to load classes', document.getElementById('classesGrid'));
  }
}

// Load trainers for dropdown
async function loadTrainers() {
  try {
    const response = await trainersAPI.getAll();
    
    if (response.success) {
      allTrainers = response.data;
      populateTrainerDropdown();
    }
  } catch (error) {
    console.error('Error loading trainers:', error);
  }
}

// Populate trainer dropdown
function populateTrainerDropdown() {
  const select = document.getElementById('classTrainer');
  select.innerHTML = '<option value="">Select a trainer</option>';
  
  allTrainers.forEach(trainer => {
    const option = document.createElement('option');
    option.value = trainer.id;
    option.setAttribute('data-trainer-name', trainer.name);
    option.textContent = `${trainer.name} - ${trainer.specialty}`;
    select.appendChild(option);
  });
}

// Display classes
function displayClasses(classes) {
  const grid = document.getElementById('classesGrid');
  
  if (!classes || classes.length === 0) {
    grid.innerHTML = '<p>No classes available</p>';
    return;
  }
  
  grid.innerHTML = classes.map(classItem => `
    <div class="card class-card">
      <div class="card-header">
        <h3 class="card-title">${classItem.name}</h3>
      </div>
      <div class="class-info">
        <span class="class-time">⏰ ${classItem.time}</span>
        <span>${classItem.duration}</span>
      </div>
      <p style="margin: 0.5rem 0;">
        <strong>Trainer:</strong> ${classItem.trainerName}
      </p>
      <div class="class-capacity" style="margin: 0.5rem 0;">
        <strong>Capacity:</strong> ${classItem.enrolled}/${classItem.capacity} enrolled
      </div>
      <div class="class-days">
        ${classItem.days.map(day => `<span class="day-badge">${day}</span>`).join('')}
      </div>
      <div class="action-buttons" style="margin-top: 1rem;">
        <button class="btn btn-small btn-secondary" onclick="editClass(${classItem.id})">Edit</button>
        <button class="btn btn-small btn-danger" onclick="deleteClass(${classItem.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Open add class modal
function openAddClassModal() {
  document.getElementById('modalTitle').textContent = 'Add Class';
  document.getElementById('classForm').reset();
  document.getElementById('classId').value = '';
  document.getElementById('classModal').classList.add('active');
}

// Edit class
async function editClass(id) {
  try {
    const classItem = allClasses.find(c => c.id === id);
    
    if (!classItem) {
      showError('Class not found');
      return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Class';
    document.getElementById('classId').value = classItem.id;
    document.getElementById('className').value = classItem.name;
    document.getElementById('classTrainer').value = classItem.trainerId;
    document.getElementById('classTime').value = classItem.time;
    document.getElementById('classDuration').value = classItem.duration;
    document.getElementById('classCapacity').value = classItem.capacity;
    
    // Check the appropriate day checkboxes
    const dayCheckboxes = document.querySelectorAll('input[name="days"]');
    dayCheckboxes.forEach(checkbox => {
      checkbox.checked = classItem.days.includes(checkbox.value);
    });
    
    document.getElementById('classModal').classList.add('active');
  } catch (error) {
    console.error('Error editing class:', error);
    showError('Failed to load class details');
  }
}

// Delete class
async function deleteClass(id) {
  if (!confirm('Are you sure you want to delete this class?')) {
    return;
  }
  
  try {
    const response = await classesAPI.delete(id);
    
    if (response.success) {
      showSuccess('Class deleted successfully');
      loadClasses();
    }
  } catch (error) {
    console.error('Error deleting class:', error);
    showError('Failed to delete class');
  }
}

// Handle class form submit
async function handleClassSubmit(event) {
  event.preventDefault();
  
  const classId = document.getElementById('classId').value;
  const trainerSelect = document.getElementById('classTrainer');
  const selectedOption = trainerSelect.options[trainerSelect.selectedIndex];
  
  // Get selected days
  const dayCheckboxes = document.querySelectorAll('input[name="days"]:checked');
  const selectedDays = Array.from(dayCheckboxes).map(cb => cb.value);
  
  const classData = {
    name: document.getElementById('className').value,
    trainerId: parseInt(document.getElementById('classTrainer').value),
    trainerName: selectedOption.getAttribute('data-trainer-name'),
    time: document.getElementById('classTime').value,
    duration: document.getElementById('classDuration').value,
    capacity: parseInt(document.getElementById('classCapacity').value),
    days: selectedDays
  };
  
  try {
    let response;
    if (classId) {
      response = await classesAPI.update(classId, classData);
    } else {
      response = await classesAPI.create(classData);
    }
    
    if (response.success) {
      showSuccess(classId ? 'Class updated successfully' : 'Class added successfully');
      closeClassModal();
      loadClasses();
    }
  } catch (error) {
    console.error('Error saving class:', error);
    showError(error.message || 'Failed to save class');
  }
}

// Close class modal
function closeClassModal() {
  document.getElementById('classModal').classList.remove('active');
  document.getElementById('classForm').reset();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadClasses();
  loadTrainers();
});
