// Trainers page functionality

let allTrainers = [];

// Load trainers
async function loadTrainers() {
  try {
    const response = await trainersAPI.getAll();
    
    if (response.success) {
      allTrainers = response.data;
      displayTrainers(allTrainers);
    }
  } catch (error) {
    console.error('Error loading trainers:', error);
    showError('Failed to load trainers', document.getElementById('trainersGrid'));
  }
}

// Display trainers
function displayTrainers(trainers) {
  const grid = document.getElementById('trainersGrid');
  
  if (!trainers || trainers.length === 0) {
    grid.innerHTML = '<p>No trainers available</p>';
    return;
  }
  
  grid.innerHTML = trainers.map(trainer => `
    <div class="card trainer-card">
      <div style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">👤</div>
      <h3 class="card-title" style="text-align: center;">${trainer.name}</h3>
      <div class="trainer-specialty">${trainer.specialty}</div>
      <div class="trainer-experience">Experience: ${trainer.experience}</div>
      <div style="margin: 1rem 0; padding-top: 1rem; border-top: 1px solid var(--light-bg);">
        <p style="margin: 0.5rem 0; font-size: 0.875rem;">
          <strong>Email:</strong> ${trainer.email}
        </p>
        ${trainer.phone ? `
          <p style="margin: 0.5rem 0; font-size: 0.875rem;">
            <strong>Phone:</strong> ${trainer.phone}
          </p>
        ` : ''}
      </div>
      ${trainer.certifications && trainer.certifications.length > 0 ? `
        <div class="trainer-certifications">
          ${trainer.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
        </div>
      ` : ''}
      <div class="action-buttons" style="margin-top: 1rem;">
        <button class="btn btn-small btn-secondary" onclick="editTrainer(${trainer.id})">Edit</button>
        <button class="btn btn-small btn-danger" onclick="deleteTrainer(${trainer.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Open add trainer modal
function openAddTrainerModal() {
  document.getElementById('modalTitle').textContent = 'Add Trainer';
  document.getElementById('trainerForm').reset();
  document.getElementById('trainerId').value = '';
  document.getElementById('trainerModal').classList.add('active');
}

// Edit trainer
async function editTrainer(id) {
  try {
    const trainer = allTrainers.find(t => t.id === id);
    
    if (!trainer) {
      showError('Trainer not found');
      return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Trainer';
    document.getElementById('trainerId').value = trainer.id;
    document.getElementById('trainerName').value = trainer.name;
    document.getElementById('trainerSpecialty').value = trainer.specialty;
    document.getElementById('trainerExperience').value = trainer.experience;
    document.getElementById('trainerEmail').value = trainer.email;
    document.getElementById('trainerPhone').value = trainer.phone || '';
    document.getElementById('trainerCerts').value = trainer.certifications ? trainer.certifications.join(', ') : '';
    document.getElementById('trainerModal').classList.add('active');
  } catch (error) {
    console.error('Error editing trainer:', error);
    showError('Failed to load trainer details');
  }
}

// Delete trainer
async function deleteTrainer(id) {
  if (!confirm('Are you sure you want to delete this trainer?')) {
    return;
  }
  
  try {
    const response = await trainersAPI.delete(id);
    
    if (response.success) {
      showSuccess('Trainer deleted successfully');
      loadTrainers();
    }
  } catch (error) {
    console.error('Error deleting trainer:', error);
    showError('Failed to delete trainer');
  }
}

// Handle trainer form submit
async function handleTrainerSubmit(event) {
  event.preventDefault();
  
  const trainerId = document.getElementById('trainerId').value;
  const certsInput = document.getElementById('trainerCerts').value;
  const certifications = certsInput ? certsInput.split(',').map(c => c.trim()).filter(c => c) : [];
  
  const trainerData = {
    name: document.getElementById('trainerName').value,
    specialty: document.getElementById('trainerSpecialty').value,
    experience: document.getElementById('trainerExperience').value,
    email: document.getElementById('trainerEmail').value,
    phone: document.getElementById('trainerPhone').value,
    certifications: certifications
  };
  
  try {
    let response;
    if (trainerId) {
      response = await trainersAPI.update(trainerId, trainerData);
    } else {
      response = await trainersAPI.create(trainerData);
    }
    
    if (response.success) {
      showSuccess(trainerId ? 'Trainer updated successfully' : 'Trainer added successfully');
      closeTrainerModal();
      loadTrainers();
    }
  } catch (error) {
    console.error('Error saving trainer:', error);
    showError(error.message || 'Failed to save trainer');
  }
}

// Close trainer modal
function closeTrainerModal() {
  document.getElementById('trainerModal').classList.remove('active');
  document.getElementById('trainerForm').reset();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadTrainers();
});
