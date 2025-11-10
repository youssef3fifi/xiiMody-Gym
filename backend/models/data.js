// In-memory data storage for the gym management system

// Membership plans with predefined data
const plans = [
  { 
    id: 1, 
    name: 'Basic', 
    price: 29.99, 
    duration: '1 Month',
    features: ['Access to gym equipment', 'Locker room access', 'Free WiFi']
  },
  { 
    id: 2, 
    name: 'Premium', 
    price: 79.99, 
    duration: '3 Months',
    features: ['All Basic features', '3 personal training sessions', 'Group classes', 'Nutrition consultation']
  },
  { 
    id: 3, 
    name: 'VIP', 
    price: 249.99, 
    duration: '1 Year',
    features: ['All Premium features', 'Unlimited personal training', 'Spa access', 'Priority booking', 'Guest passes']
  }
];

// Members array - stores all gym members
const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-0101',
    membershipPlan: 'Premium',
    planId: 2,
    joinDate: '2024-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-0102',
    membershipPlan: 'Basic',
    planId: 1,
    joinDate: '2024-02-20',
    status: 'Active'
  }
];

// Trainers array - stores all gym trainers
const trainers = [
  {
    id: 1,
    name: 'Mike Johnson',
    specialty: 'Strength Training',
    experience: '8 years',
    email: 'mike.j@xiimody-gym.com',
    phone: '555-0201',
    certifications: ['NASM-CPT', 'CSCS']
  },
  {
    id: 2,
    name: 'Sarah Williams',
    specialty: 'Yoga & Flexibility',
    experience: '6 years',
    email: 'sarah.w@xiimody-gym.com',
    phone: '555-0202',
    certifications: ['RYT-500', 'E-RYT 200']
  },
  {
    id: 3,
    name: 'David Brown',
    specialty: 'Cardio & Weight Loss',
    experience: '5 years',
    email: 'david.b@xiimody-gym.com',
    phone: '555-0203',
    certifications: ['ACE-CPT', 'FNS']
  }
];

// Classes array - stores all gym classes
const classes = [
  {
    id: 1,
    name: 'Morning Yoga',
    trainerId: 2,
    trainerName: 'Sarah Williams',
    time: '07:00 AM',
    duration: '60 min',
    capacity: 20,
    enrolled: 15,
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 2,
    name: 'HIIT Training',
    trainerId: 3,
    trainerName: 'David Brown',
    time: '06:00 PM',
    duration: '45 min',
    capacity: 15,
    enrolled: 12,
    days: ['Tuesday', 'Thursday']
  },
  {
    id: 3,
    name: 'Strength & Conditioning',
    trainerId: 1,
    trainerName: 'Mike Johnson',
    time: '05:00 PM',
    duration: '75 min',
    capacity: 12,
    enrolled: 10,
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 4,
    name: 'Evening Spin Class',
    trainerId: 3,
    trainerName: 'David Brown',
    time: '07:00 PM',
    duration: '45 min',
    capacity: 25,
    enrolled: 20,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
];

// Attendance tracking
const attendance = [];

// Counter for generating unique IDs
let memberIdCounter = members.length + 1;
let trainerIdCounter = trainers.length + 1;
let classIdCounter = classes.length + 1;
let attendanceIdCounter = 1;

module.exports = {
  plans,
  members,
  trainers,
  classes,
  attendance,
  getNextMemberId: () => memberIdCounter++,
  getNextTrainerId: () => trainerIdCounter++,
  getNextClassId: () => classIdCounter++,
  getNextAttendanceId: () => attendanceIdCounter++
};
