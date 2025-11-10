# XiiMody Gym Management System - Deployment Guide

This guide provides step-by-step instructions for deploying the XiiMody Gym Management System on AWS.

## Architecture Overview

- **Backend**: Node.js/Express API running on EC2
- **Frontend**: Static HTML/CSS/JS files (deployed on S3 or EC2)
- **Database**: In-memory storage (no external database required)

## Prerequisites

- AWS Account
- AWS CLI configured (for S3 deployment)
- EC2 instance(s) running Amazon Linux 2 or Ubuntu
- Basic knowledge of SSH and terminal commands

---

## Part 1: Backend Deployment (EC2)

### Step 1: Launch an EC2 Instance

1. Go to AWS EC2 Console
2. Click "Launch Instance"
3. Choose an AMI:
   - **Recommended**: Amazon Linux 2 AMI (Free tier eligible)
4. Choose Instance Type:
   - **Recommended**: t2.micro (Free tier eligible)
5. Configure Security Group:
   - Allow SSH (port 22) from your IP
   - **Important**: Allow Custom TCP (port 3000) from anywhere (0.0.0.0/0)
6. Create or select an existing key pair
7. Launch the instance

### Step 2: Connect to Your EC2 Instance

```bash
ssh -i "your-key.pem" ec2-user@<YOUR-EC2-PUBLIC-IP>
```

### Step 3: Upload Backend Files

**Option A: Using SCP**
```bash
# From your local machine
scp -i "your-key.pem" -r backend/ ec2-user@<YOUR-EC2-PUBLIC-IP>:/home/ec2-user/xiimody-gym/
```

**Option B: Using Git**
```bash
# On EC2 instance
cd /home/ec2-user
git clone <your-repository-url> xiimody-gym
```

### Step 4: Run Backend Setup Script

```bash
cd xiimody-gym/deployment
chmod +x backend-setup.sh
./backend-setup.sh
```

This script will:
- Install Node.js and npm
- Install application dependencies
- Set up environment variables
- Install and configure PM2
- Start the application

### Step 5: Verify Backend is Running

```bash
# Check PM2 status
pm2 status

# Test the API
curl http://localhost:3000/api/health

# View logs
pm2 logs
```

Your backend API should now be accessible at:
```
http://<YOUR-EC2-PUBLIC-IP>:3000
```

---

## Part 2: Frontend Deployment

You have two options for deploying the frontend:

### Option A: Deploy to AWS S3 (Recommended)

**Advantages:**
- Cost-effective
- Highly scalable
- No server management

**Steps:**

1. **Create an S3 Bucket**
   ```bash
   aws s3 mb s3://xiimody-gym-frontend
   ```

2. **Update Frontend Configuration**
   
   Edit `frontend/js/config.js`:
   ```javascript
   const API_URL = 'http://<YOUR-EC2-PUBLIC-IP>:3000';
   ```

3. **Upload Frontend Files**
   ```bash
   aws s3 sync frontend/ s3://xiimody-gym-frontend/ --delete
   ```

4. **Enable Static Website Hosting**
   ```bash
   aws s3 website s3://xiimody-gym-frontend/ --index-document index.html
   ```

5. **Configure Bucket Policy for Public Access**
   
   Create a file `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::xiimody-gym-frontend/*"
       }
     ]
   }
   ```
   
   Apply the policy:
   ```bash
   aws s3api put-bucket-policy --bucket xiimody-gym-frontend --policy file://bucket-policy.json
   ```

6. **Access Your Website**
   ```
   http://xiimody-gym-frontend.s3-website-<region>.amazonaws.com
   ```

### Option B: Deploy to EC2 with Nginx

**Advantages:**
- More control over hosting environment
- Can use custom domain easily
- Single IP for both frontend and backend

**Steps:**

1. **Use the same EC2 instance or create a new one**

2. **Upload frontend files to EC2**
   ```bash
   scp -i "your-key.pem" -r frontend/ ec2-user@<YOUR-EC2-PUBLIC-IP>:/home/ec2-user/xiimody-gym/
   ```

3. **Update Frontend Configuration**
   
   Edit `frontend/js/config.js`:
   ```javascript
   const API_URL = 'http://<YOUR-BACKEND-EC2-IP>:3000';
   ```

4. **Run Frontend Setup Script**
   ```bash
   cd xiimody-gym/deployment
   chmod +x frontend-setup.sh
   ./frontend-setup.sh
   ```
   Choose option 2 and provide your backend EC2 IP.

5. **Configure Security Group**
   - Allow HTTP (port 80) from anywhere (0.0.0.0/0)

6. **Access Your Website**
   ```
   http://<YOUR-FRONTEND-EC2-IP>
   ```

---

## Part 3: Configuration & Security

### CORS Configuration

Your backend is already configured to accept requests from any origin:
```javascript
// backend/config/config.js
FRONTEND_URL: process.env.FRONTEND_URL || '*'
```

For production, you can specify the exact frontend URL:
```bash
# On EC2, edit the .env file
echo "FRONTEND_URL=http://your-frontend-url.com" >> backend/.env
pm2 restart all
```

### Security Group Configuration

**Backend EC2:**
- SSH (22): Your IP only
- Custom TCP (3000): 0.0.0.0/0 (or your frontend IP)

**Frontend EC2 (if using Option B):**
- SSH (22): Your IP only
- HTTP (80): 0.0.0.0/0

### Environment Variables

On the backend EC2, you can customize:
```bash
# backend/.env
PORT=3000
FRONTEND_URL=*
NODE_ENV=production
```

---

## Part 4: Testing Your Deployment

### Test Backend API

```bash
# Health check
curl http://<BACKEND-IP>:3000/api/health

# Get members
curl http://<BACKEND-IP>:3000/api/members

# Get dashboard stats
curl http://<BACKEND-IP>:3000/api/dashboard/stats
```

### Test Frontend

1. Open your browser and navigate to your frontend URL
2. Navigate through all pages:
   - Dashboard
   - Members
   - Classes
   - Plans
   - Trainers
3. Test CRUD operations:
   - Add a new member
   - Edit a member
   - Delete a member
   - Add a new class
   - Add a new trainer

---

## Part 5: Maintenance & Monitoring

### Useful PM2 Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart xiimody-gym-api

# Stop application
pm2 stop xiimody-gym-api

# View monitoring dashboard
pm2 monit
```

### Updating the Application

**Backend Updates:**
```bash
cd /home/ec2-user/xiimody-gym/backend
git pull  # If using git
npm install  # If dependencies changed
pm2 restart all
```

**Frontend Updates (S3):**
```bash
# Update config if needed
# Then sync to S3
aws s3 sync frontend/ s3://xiimody-gym-frontend/ --delete
```

**Frontend Updates (EC2/Nginx):**
```bash
sudo cp -r frontend/* /var/www/xiimody-gym/
sudo systemctl restart nginx
```

---

## Troubleshooting

### Backend Issues

**Problem**: Cannot connect to API
- Check EC2 security group allows port 3000
- Verify application is running: `pm2 status`
- Check logs: `pm2 logs`

**Problem**: API returns 500 errors
- Check PM2 logs: `pm2 logs`
- Verify all dependencies are installed: `npm install`

### Frontend Issues

**Problem**: Cannot load data from API
- Check browser console for errors (F12)
- Verify `config.js` has correct backend IP
- Check CORS configuration on backend

**Problem**: 404 errors on S3
- Verify bucket policy allows public access
- Check bucket name and region in URL

### Connection Issues

**Problem**: CORS errors in browser
- Verify backend CORS configuration
- Check FRONTEND_URL environment variable
- Restart backend: `pm2 restart all`

---

## Cost Estimation

### Minimal Setup (Free Tier Eligible)
- **EC2 t2.micro** (Backend): Free tier - $0/month (first 12 months)
- **S3** (Frontend): ~$0.50/month (assuming low traffic)
- **Data Transfer**: Free tier includes 15GB/month

### After Free Tier
- **EC2 t2.micro**: ~$8-10/month
- **S3 + CloudFront**: ~$1-3/month (low traffic)

---

## Next Steps

1. **Custom Domain**: Configure Route 53 and point to your EC2/S3
2. **HTTPS**: Set up SSL certificate using AWS Certificate Manager
3. **CloudFront**: Add CloudFront distribution for better performance
4. **Monitoring**: Set up CloudWatch alarms for EC2 health
5. **Backups**: Since data is in-memory, consider implementing data persistence

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review PM2 logs: `pm2 logs`
3. Check AWS CloudWatch logs
4. Refer to documentation:
   - [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
   - [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
   - [PM2 Documentation](https://pm2.keymetrics.io/docs/)

---

## Security Best Practices

1. **Never commit sensitive data** to version control
2. **Use environment variables** for configuration
3. **Limit security group rules** to specific IPs when possible
4. **Keep Node.js and dependencies updated**
5. **Implement rate limiting** for production use
6. **Add authentication** before deploying to production
7. **Use HTTPS** in production environments

---

**Congratulations! Your XiiMody Gym Management System is now deployed on AWS! 🎉**
