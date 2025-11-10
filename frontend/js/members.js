// Members page functionality

let allMembers = [];
let allPlans = [];

// Load members
async function loadMembers() {
  try {
    const response = await membersAPI.getAll();
    
    if (response.success) {
      allMembers = response.data;
      displayMembers(allMembers);
    }
  } catch (error) {
    console.error('Error loading members:', error);
    showError('Failed to load members', document.getElementById('membersTableBody'));
  }
}

// Load plans for dropdown
async function loadPlans() {
  try {
    const response = await plansAPI.getAll();
    
    if (response.success) {
      allPlans = response.data;
      populatePlanDropdown();
    }
  } catch (error) {
    console.error('Error loading plans:', error);
  }
}

// Populate plan dropdown
function populatePlanDropdown() {
  const select = document.getElementById('memberPlan');
  select.innerHTML = '<option value="">Select a plan</option>';
  
  allPlans.forEach(plan => {
    const option = document.createElement('option');
    option.value = plan.name;
    option.setAttribute('data-plan-id', plan.id);
    option.textContent = `${plan.name} - $${plan.price} (${plan.duration})`;
    select.appendChild(option);
  });
}

// Display members in table
function displayMembers(members) {
  const tbody = document.getElementById('membersTableBody');
  
  if (!members || members.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No members found</td></tr>';
    return;
  }
  
  tbody.innerHTML = members.map(member => `
    <tr>
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${member.membershipPlan}</td>
      <td>${member.joinDate}</td>
      <td><span class="status-badge ${member.status.toLowerCase()}">${member.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-small btn-secondary" onclick="editMember(${member.id})">Edit</button>
          <button class="btn btn-small btn-danger" onclick="deleteMember(${member.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Search members
function searchMembers(query) {
  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(query.toLowerCase()) ||
    member.email.toLowerCase().includes(query.toLowerCase())
  );
  displayMembers(filteredMembers);
}

// Open add member modal
function openAddMemberModal() {
  document.getElementById('modalTitle').textContent = 'Add Member';
  document.getElementById('memberForm').reset();
  document.getElementById('memberId').value = '';
  document.getElementById('memberStatus').value = 'Active';
  document.getElementById('memberModal').classList.add('active');
}

// Edit member
async function editMember(id) {
  try {
    const member = allMembers.find(m => m.id === id);
    
    if (!member) {
      showError('Member not found');
      return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Member';
    document.getElementById('memberId').value = member.id;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone;
    document.getElementById('memberPlan').value = member.membershipPlan;
    document.getElementById('memberStatus').value = member.status;
    document.getElementById('memberModal').classList.add('active');
  } catch (error) {
    console.error('Error editing member:', error);
    showError('Failed to load member details');
  }
}

// Delete member
async function deleteMember(id) {
  if (!confirm('Are you sure you want to delete this member?')) {
    return;
  }
  
  try {
    const response = await membersAPI.delete(id);
    
    if (response.success) {
      showSuccess('Member deleted successfully');
      loadMembers();
    }
  } catch (error) {
    console.error('Error deleting member:', error);
    showError('Failed to delete member');
  }
}

// Handle member form submit
async function handleMemberSubmit(event) {
  event.preventDefault();
  
  const memberId = document.getElementById('memberId').value;
  const planSelect = document.getElementById('memberPlan');
  const selectedOption = planSelect.options[planSelect.selectedIndex];
  
  const memberData = {
    name: document.getElementById('memberName').value,
    email: document.getElementById('memberEmail').value,
    phone: document.getElementById('memberPhone').value,
    membershipPlan: document.getElementById('memberPlan').value,
    planId: parseInt(selectedOption.getAttribute('data-plan-id')),
    status: document.getElementById('memberStatus').value
  };
  
  try {
    let response;
    if (memberId) {
      response = await membersAPI.update(memberId, memberData);
    } else {
      response = await membersAPI.create(memberData);
    }
    
    if (response.success) {
      showSuccess(memberId ? 'Member updated successfully' : 'Member added successfully');
      closeMemberModal();
      loadMembers();
    }
  } catch (error) {
    console.error('Error saving member:', error);
    showError(error.message || 'Failed to save member');
  }
}

// Close member modal
function closeMemberModal() {
  document.getElementById('memberModal').classList.remove('active');
  document.getElementById('memberForm').reset();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadMembers();
  loadPlans();
  
  // Setup search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchMembers(e.target.value);
  });
});
