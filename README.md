User Authentication System

Overview
This is a secure and minimal user authentication system built using Node.js, Express.js, and MongoDB. It enables users to register, log in, and manage sessions securely with JWT authentication.

Features
✅ User Registration – Create an account securely
✅ User Login – Authenticate users with JWT tokens
✅ Password Hashing – Ensures password security with bcrypt
✅ Logout Functionality – Manage user sessions effectively
✅ MongoDB Integration – Store and manage user data seamlessly

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (JSON Web Token), bcrypt

Getting Started
Prerequisites
Before you begin, make sure you have:

Node.js installed
A running instance of MongoDB (either locally or on MongoDB Atlas)

Setup Instructions
Clone the repository:
git clone https://github.com/DhanushDhanush2001/User-Authentication-System.git  
cd User-Authentication-System

Install dependencies:
npm install

Create a .env file in the root directory and add:
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret
SMTP_HOST = 
SMTP_PORT = 
SMTP_USER = 
SMTP_PASS = 
SMTP_NAME = 
SMTP_FROM_EMAIL = 
use mailtrap.io for forgot password mail sending.

Start the server:
npm start

Postman Collection
To test the authentication system, use this Postman Collection:
🔗 Postman Collection
https://public-api-3199.postman.co/workspace/Public-WorkPlace~8db02e2e-2bb8-4e38-8b12-86ece3af84ba/collection/33341630-bfa021ee-fa09-4213-8a71-bc8724534eca?action=share&creator=33341630

License
This project is open-source and licensed under the MIT License.

Author
👨‍💻 Dhanush Dhanush
If you have any questions or feedback, feel free to reach out!

