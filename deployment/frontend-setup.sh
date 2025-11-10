#!/bin/bash

# XiiMody Gym Management System - Frontend Setup Script
# This script helps deploy the frontend to S3 or EC2

echo "=========================================="
echo "XiiMody Gym Frontend Deployment"
echo "=========================================="
echo ""
echo "Choose deployment method:"
echo "1) Deploy to AWS S3 (Static Website Hosting)"
echo "2) Deploy to EC2 (with Nginx)"
echo ""
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "Deploying to AWS S3..."
    echo ""
    
    read -p "Enter your S3 bucket name: " BUCKET_NAME
    read -p "Enter your backend EC2 IP (e.g., 3.85.123.45): " BACKEND_IP
    
    # Update config.js with backend IP
    echo "Updating API configuration..."
    sed -i "s|const API_URL = 'http://localhost:3000';|const API_URL = 'http://${BACKEND_IP}:3000';|g" ../frontend/js/config.js
    
    # Upload to S3
    echo "Uploading files to S3..."
    aws s3 sync ../frontend/ s3://${BUCKET_NAME}/ --delete
    
    # Configure bucket for static website hosting
    echo "Configuring S3 bucket for static website hosting..."
    aws s3 website s3://${BUCKET_NAME}/ --index-document index.html
    
    echo ""
    echo "=========================================="
    echo "Deployment Complete!"
    echo "=========================================="
    echo "Your website should be accessible at:"
    echo "http://${BUCKET_NAME}.s3-website-<region>.amazonaws.com"
    echo ""
    echo "Don't forget to:"
    echo "1. Make the bucket public or configure appropriate bucket policy"
    echo "2. Enable CORS on your backend EC2 instance"
    echo "=========================================="
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "Setting up frontend on EC2 with Nginx..."
    echo ""
    
    read -p "Enter your backend EC2 IP (e.g., 3.85.123.45): " BACKEND_IP
    
    # Update config.js with backend IP
    echo "Updating API configuration..."
    sed -i "s|const API_URL = 'http://localhost:3000';|const API_URL = 'http://${BACKEND_IP}:3000';|g" ../frontend/js/config.js
    
    # Install Nginx
    echo "Installing Nginx..."
    sudo yum install -y nginx
    
    # Create web directory
    echo "Setting up web directory..."
    sudo mkdir -p /var/www/xiimody-gym
    sudo cp -r ../frontend/* /var/www/xiimody-gym/
    
    # Configure Nginx
    echo "Configuring Nginx..."
    sudo tee /etc/nginx/conf.d/xiimody-gym.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    
    root /var/www/xiimody-gym;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
    
    # Start Nginx
    echo "Starting Nginx..."
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    echo ""
    echo "=========================================="
    echo "Deployment Complete!"
    echo "=========================================="
    echo "Your website should be accessible at:"
    echo "http://<YOUR-EC2-PUBLIC-IP>"
    echo ""
    echo "Don't forget to:"
    echo "1. Configure EC2 Security Group to allow port 80 (HTTP)"
    echo "2. Enable CORS on your backend EC2 instance"
    echo "=========================================="
    
else
    echo "Invalid choice. Exiting."
    exit 1
fi
