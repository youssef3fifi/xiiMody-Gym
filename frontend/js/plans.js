// Plans page functionality

// Load membership plans
async function loadPlans() {
  try {
    const response = await plansAPI.getAll();
    
    if (response.success) {
      displayPlans(response.data);
    }
  } catch (error) {
    console.error('Error loading plans:', error);
    showError('Failed to load membership plans', document.getElementById('plansGrid'));
  }
}

// Display plans
function displayPlans(plans) {
  const grid = document.getElementById('plansGrid');
  
  if (!plans || plans.length === 0) {
    grid.innerHTML = '<p>No membership plans available</p>';
    return;
  }
  
  // Define colors for different plans
  const planColors = {
    'Basic': '#3498db',
    'Premium': '#ff4757',
    'VIP': '#ffa502'
  };
  
  grid.innerHTML = plans.map(plan => `
    <div class="card plan-card" style="border-top-color: ${planColors[plan.name] || 'var(--primary-color)'}">
      <h3 class="card-title" style="text-align: center; font-size: 1.75rem;">${plan.name}</h3>
      <div class="plan-price">$${plan.price}</div>
      <div class="plan-duration">${plan.duration}</div>
      <ul class="plan-features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" style="width: 100%;" onclick="selectPlan(${plan.id})">
        Choose ${plan.name}
      </button>
    </div>
  `).join('');
}

// Select plan (for future use - could redirect to member signup)
function selectPlan(planId) {
  showSuccess(`Plan selected! Redirecting to member registration...`);
  setTimeout(() => {
    window.location.href = 'members.html';
  }, 1500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadPlans();
});
