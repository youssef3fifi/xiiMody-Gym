# Quick Start Guide - XiiMody Gym Management System

Get your gym management system running in 5 minutes!

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- A web browser

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd xiiMody-Gym
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Start the Backend Server
```bash
npm start
```

You should see:
```
==================================================
XiiMody Gym Management API Server
Environment: development
Port: 3000
Frontend URL: *
Server started at: ...
==================================================
```

### 4. Open the Frontend

**Option A: Direct File Access**
- Open `frontend/index.html` in your browser

**Option B: Using Python HTTP Server** (Recommended)
```bash
# Open a new terminal
cd frontend
python3 -m http.server 8080
```

Then visit: http://localhost:8080

## Verify Installation

1. **Test the API**
   ```bash
   curl http://localhost:3000/api/health
   ```
   
   You should see:
   ```json
   {
     "success": true,
     "message": "XiiMody Gym Management API is running",
     "timestamp": "..."
   }
   ```

2. **Access the Dashboard**
   - Open http://localhost:8080 (or the frontend HTML file)
   - You should see the dashboard with statistics

3. **Test Features**
   - Navigate to Members page
   - Click "+ Add Member"
   - Fill in the form and save
   - Verify the new member appears in the table

## Default Data

The system comes with sample data:

**Members:**
- John Doe (Premium plan)
- Jane Smith (Basic plan)

**Trainers:**
- Mike Johnson (Strength Training)
- Sarah Williams (Yoga & Flexibility)
- David Brown (Cardio & Weight Loss)

**Classes:**
- Morning Yoga
- HIIT Training
- Strength & Conditioning
- Evening Spin Class

**Plans:**
- Basic ($29.99/month)
- Premium ($79.99/3 months)
- VIP ($249.99/year)

## Available Pages

1. **Dashboard** (index.html) - Overview with statistics
2. **Members** (members.html) - Manage gym members
3. **Classes** (classes.html) - Class schedule management
4. **Plans** (plans.html) - Membership plans
5. **Trainers** (trainers.html) - Trainer profiles

## API Endpoints

- **Members**: http://localhost:3000/api/members
- **Trainers**: http://localhost:3000/api/trainers
- **Classes**: http://localhost:3000/api/classes
- **Plans**: http://localhost:3000/api/plans
- **Dashboard Stats**: http://localhost:3000/api/dashboard/stats
- **Health Check**: http://localhost:3000/api/health

## Configuration

### Backend Port
Edit `backend/config/config.js` or set environment variable:
```bash
PORT=3000 node backend/server.js
```

### Frontend API URL
Edit `frontend/js/config.js`:
```javascript
const API_URL = 'http://localhost:3000';
```

## Troubleshooting

### Backend won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Install dependencies: `cd backend && npm install`

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check browser console for errors (F12)
- Ensure `config.js` has correct API URL

### CORS errors
- Backend CORS is configured to allow all origins
- If issues persist, check browser console

## Next Steps

- ✅ Add more members, classes, and trainers
- ✅ Explore the search functionality
- ✅ Test editing and deleting records
- ✅ Check out the deployment guide for AWS: `deployment/README.md`

## Production Deployment

For AWS deployment, see the comprehensive guide:
- **Documentation**: `deployment/README.md`
- **Backend Script**: `deployment/backend-setup.sh`
- **Frontend Script**: `deployment/frontend-setup.sh`

## Support

For issues or questions:
- Check the main README.md
- Review deployment/README.md for AWS help
- Check logs: `pm2 logs` (in production)

---

**Enjoy managing your gym with XiiMody! 💪**
