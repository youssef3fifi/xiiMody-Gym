#!/bin/bash

# XiiMody Gym Management System - Backend Setup Script for EC2
# This script sets up the Node.js backend on an EC2 instance

echo "=========================================="
echo "XiiMody Gym Backend Setup for AWS EC2"
echo "=========================================="

# Update system packages
echo "Updating system packages..."
sudo yum update -y

# Install Node.js (using NodeSource repository for latest LTS)
echo "Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
echo "Node.js version:"
node --version
echo "NPM version:"
npm --version

# Navigate to application directory
echo "Setting up application directory..."
cd /home/ec2-user
mkdir -p xiimody-gym
cd xiimody-gym

# Clone or copy your backend files here
# If using git:
# git clone <your-repo-url> .

# Install dependencies
echo "Installing application dependencies..."
cd backend
npm install

# Set up environment variables
echo "Setting up environment variables..."
cat > .env << EOF
PORT=3000
FRONTEND_URL=*
NODE_ENV=production
EOF

# Install PM2 for process management
echo "Installing PM2..."
sudo npm install -g pm2

# Start the application with PM2
echo "Starting application with PM2..."
pm2 start server.js --name xiimody-gym-api

# Configure PM2 to start on system boot
echo "Configuring PM2 to start on boot..."
pm2 startup
pm2 save

# Display application status
echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
pm2 status

echo ""
echo "Your API is now running on port 3000"
echo "Access it at: http://<YOUR-EC2-PUBLIC-IP>:3000"
echo ""
echo "Useful PM2 Commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs            - View application logs"
echo "  pm2 restart all     - Restart the application"
echo "  pm2 stop all        - Stop the application"
echo ""
echo "Don't forget to configure your EC2 Security Group:"
echo "  - Allow inbound traffic on port 3000 (Custom TCP)"
echo "  - Allow from anywhere (0.0.0.0/0) or specific IPs"
echo "=========================================="
