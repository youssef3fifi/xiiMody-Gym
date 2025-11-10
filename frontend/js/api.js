// API utilities for making HTTP requests

// Generic fetch wrapper with error handling
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Members API
const membersAPI = {
  getAll: () => apiRequest(API_ENDPOINTS.members),
  getById: (id) => apiRequest(`${API_ENDPOINTS.members}/${id}`),
  create: (memberData) => apiRequest(API_ENDPOINTS.members, {
    method: 'POST',
    body: JSON.stringify(memberData),
  }),
  update: (id, memberData) => apiRequest(`${API_ENDPOINTS.members}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(memberData),
  }),
  delete: (id) => apiRequest(`${API_ENDPOINTS.members}/${id}`, {
    method: 'DELETE',
  }),
};

// Trainers API
const trainersAPI = {
  getAll: () => apiRequest(API_ENDPOINTS.trainers),
  getById: (id) => apiRequest(`${API_ENDPOINTS.trainers}/${id}`),
  create: (trainerData) => apiRequest(API_ENDPOINTS.trainers, {
    method: 'POST',
    body: JSON.stringify(trainerData),
  }),
  update: (id, trainerData) => apiRequest(`${API_ENDPOINTS.trainers}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(trainerData),
  }),
  delete: (id) => apiRequest(`${API_ENDPOINTS.trainers}/${id}`, {
    method: 'DELETE',
  }),
};

// Classes API
const classesAPI = {
  getAll: () => apiRequest(API_ENDPOINTS.classes),
  getById: (id) => apiRequest(`${API_ENDPOINTS.classes}/${id}`),
  create: (classData) => apiRequest(API_ENDPOINTS.classes, {
    method: 'POST',
    body: JSON.stringify(classData),
  }),
  update: (id, classData) => apiRequest(`${API_ENDPOINTS.classes}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(classData),
  }),
  delete: (id) => apiRequest(`${API_ENDPOINTS.classes}/${id}`, {
    method: 'DELETE',
  }),
};

// Plans API
const plansAPI = {
  getAll: () => apiRequest(API_ENDPOINTS.plans),
  getById: (id) => apiRequest(`${API_ENDPOINTS.plans}/${id}`),
};

// Dashboard API
const dashboardAPI = {
  getStats: () => apiRequest(API_ENDPOINTS.dashboard),
};

// Show loading spinner
function showLoading(element) {
  if (element) {
    element.innerHTML = '<div class="loading-spinner">Loading...</div>';
  }
}

// Show error message
function showError(message, element) {
  if (element) {
    element.innerHTML = `<div class="error-message">${message}</div>`;
  } else {
    alert(message);
  }
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}
