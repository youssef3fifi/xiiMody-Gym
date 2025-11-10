# XiiMody Gym Management System 💪

A comprehensive, full-stack Gym Management System built with Node.js, Express, and vanilla JavaScript. This system provides complete gym management capabilities including member management, class scheduling, trainer profiles, and membership plans.

## 🌟 Features

### Member Management
- Add, edit, and delete gym members
- Track membership plans and status
- Search and filter members
- View member details and history

### Class Schedule Management
- Create and manage gym classes
- Assign trainers to classes
- Set class capacity and schedules
- Track enrollments

### Trainer Management
- Manage trainer profiles
- Track specialties and certifications
- View trainer schedules

### Membership Plans
- Multiple plan tiers (Basic, Premium, VIP)
- Detailed feature lists
- Pricing and duration management

### Dashboard
- Real-time statistics
- Member overview
- Class schedules
- Revenue tracking

## 🏗️ Architecture

### Backend
- **Framework**: Node.js with Express.js
- **Data Storage**: In-memory (JavaScript objects/arrays)
- **API**: RESTful API with JSON responses
- **CORS**: Configured for AWS deployment

### Frontend
- **Technology**: Vanilla HTML, CSS, JavaScript
- **Design**: Responsive, mobile-friendly
- **Pages**: 5 fully functional pages
  - Dashboard (index.html)
  - Members Management (members.html)
  - Class Schedule (classes.html)
  - Membership Plans (plans.html)
  - Trainers (trainers.html)

## 📁 Project Structure

```
xiiMody-Gym/
├── backend/
│   ├── config/
│   │   └── config.js           # Server configuration
│   ├── controllers/
│   │   ├── memberController.js
│   │   ├── trainerController.js
│   │   ├── classController.js
│   │   ├── planController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   └── data.js              # In-memory data storage
│   ├── routes/
│   │   ├── members.js
│   │   ├── trainers.js
│   │   ├── classes.js
│   │   ├── plans.js
│   │   └── dashboard.js
│   ├── server.js                # Main server file
│   └── package.json
├── frontend/
│   ├── css/
│   │   └── styles.css           # Main stylesheet
│   ├── js/
│   │   ├── config.js            # API configuration
│   │   ├── api.js               # API utilities
│   │   ├── dashboard.js
│   │   ├── members.js
│   │   ├── classes.js
│   │   ├── plans.js
│   │   └── trainers.js
│   ├── index.html               # Dashboard
│   ├── members.html
│   ├── classes.html
│   ├── plans.html
│   └── trainers.html
└── deployment/
    ├── README.md                # Deployment guide
    ├── backend-setup.sh         # Backend setup script
    └── frontend-setup.sh        # Frontend setup script
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xiiMody-Gym
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open the frontend**
   - Simply open `frontend/index.html` in your browser
   - Or use a local server:
     ```bash
     cd frontend
     python -m http.server 8080
     # Then visit http://localhost:8080
     ```

## 🌐 AWS Deployment

### Quick Start

1. **Deploy Backend to EC2**
   - Launch an EC2 instance (Amazon Linux 2 recommended)
   - Upload backend files
   - Run `deployment/backend-setup.sh`
   - Configure security group (allow port 3000)

2. **Deploy Frontend**
   
   **Option A: S3 (Recommended)**
   - Create an S3 bucket
   - Update `frontend/js/config.js` with your EC2 IP
   - Upload frontend files
   - Enable static website hosting
   
   **Option B: EC2 with Nginx**
   - Use same or different EC2 instance
   - Run `deployment/frontend-setup.sh`
   - Configure security group (allow port 80)

### Detailed Instructions

See [deployment/README.md](deployment/README.md) for comprehensive deployment guide including:
- Step-by-step EC2 setup
- S3 configuration
- Security group settings
- CORS configuration
- Troubleshooting tips

## 🔧 Configuration

### Backend Configuration
Edit `backend/config/config.js` or use environment variables:
```javascript
PORT=3000              # Server port
FRONTEND_URL=*         # CORS allowed origins
NODE_ENV=production    # Environment
```

### Frontend Configuration
Edit `frontend/js/config.js`:
```javascript
const API_URL = 'http://localhost:3000';
// For AWS: const API_URL = 'http://<EC2-IP>:3000';
```

## 📡 API Endpoints

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get trainer by ID
- `POST /api/trainers` - Create new trainer
- `PUT /api/trainers/:id` - Update trainer
- `DELETE /api/trainers/:id` - Delete trainer

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Plans
- `GET /api/plans` - Get all membership plans
- `GET /api/plans/:id` - Get plan by ID

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Health
- `GET /api/health` - Health check endpoint

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean and professional interface
- **Color Scheme**: Energetic colors suitable for a gym
- **Interactive Elements**: Modals, forms, and dynamic content
- **User Feedback**: Success/error messages and loading states

## 🔒 Security Notes

⚠️ **Important**: This is a demonstration project with in-memory storage.

For production use, consider:
- Implementing authentication and authorization
- Adding input validation and sanitization
- Using a persistent database
- Implementing rate limiting
- Adding HTTPS/SSL
- Securing API endpoints
- Implementing proper error handling

## 🧪 Testing

To test the application locally:

1. Start the backend server
2. Open the frontend in a browser
3. Test all CRUD operations:
   - Create, read, update, delete members
   - Add and manage classes
   - View and interact with dashboard statistics

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own gym management system.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📞 Support

For deployment help, see the [deployment guide](deployment/README.md).

## 🎯 Future Enhancements

Potential improvements:
- Database integration (MongoDB, PostgreSQL)
- User authentication and roles
- Payment processing
- Email notifications
- Mobile app
- Attendance tracking with QR codes
- Advanced reporting and analytics
- Equipment management
- Booking system

---

**Built with ❤️ for gym management**