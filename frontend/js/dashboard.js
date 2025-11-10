// Dashboard functionality

// Load dashboard statistics
async function loadDashboardStats() {
  try {
    const response = await dashboardAPI.getStats();
    
    if (response.success) {
      const stats = response.data;
      
      // Update stat cards
      document.getElementById('totalMembers').textContent = stats.totalMembers;
      document.getElementById('activeMembers').textContent = stats.activeMembers;
      document.getElementById('todayClasses').textContent = stats.todayClasses;
      document.getElementById('totalRevenue').textContent = `$${stats.totalRevenue}`;
      
      // Display today's classes
      displayTodayClasses(stats.todayClassList);
      
      // Display recent members
      displayRecentMembers(stats.recentMembers);
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error);
    showError('Failed to load dashboard statistics', document.getElementById('statsGrid'));
  }
}

// Display today's classes
function displayTodayClasses(classes) {
  const container = document.getElementById('todayClassList');
  
  if (!classes || classes.length === 0) {
    container.innerHTML = '<p>No classes scheduled for today.</p>';
    return;
  }
  
  container.innerHTML = classes.map(classItem => `
    <div class="class-card card" style="margin-bottom: 1rem;">
      <div class="class-info">
        <h3 style="margin: 0;">${classItem.name}</h3>
        <span class="class-time">${classItem.time}</span>
      </div>
      <p style="margin: 0.5rem 0; color: var(--light-text);">
        <strong>Trainer:</strong> ${classItem.trainerName}
      </p>
      <div class="class-capacity">
        <strong>Capacity:</strong> ${classItem.enrolled}/${classItem.capacity}
      </div>
      <div class="class-days">
        ${classItem.days.map(day => `<span class="day-badge">${day}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Display recent members
function displayRecentMembers(members) {
  const container = document.getElementById('recentMembersList');
  
  if (!members || members.length === 0) {
    container.innerHTML = '<p>No recent members.</p>';
    return;
  }
  
  container.innerHTML = members.map(member => `
    <div style="padding: 0.75rem; border-bottom: 1px solid var(--light-bg);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${member.name}</strong>
          <div style="font-size: 0.875rem; color: var(--light-text);">
            ${member.email}
          </div>
        </div>
        <span class="status-badge ${member.status.toLowerCase()}">${member.status}</span>
      </div>
    </div>
  `).join('');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDashboardStats();
  
  // Refresh stats every 30 seconds
  setInterval(loadDashboardStats, 30000);
});
