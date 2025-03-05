User Authentication System
Overview
A minimal and secure user authentication system built with Node.js, Express.js, and MongoDB. It supports user registration, login, authentication, and protected routes using JWT-based authentication.

Features
✔️ User Registration & Login with JWT
✔️ Password Hashing using bcrypt
✔️ Protected Routes (Authorization)
✔️ Logout Functionality
✔️ MongoDB Integration

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (JSON Web Token), bcrypt
Installation & Setup
Prerequisites
✅ Node.js installed
✅ MongoDB (Local or Atlas)

Steps to Run the Project
Clone the repository:

sh
Copy
Edit
git clone https://github.com/DhanushDhanush2001/User-Authentication-System.git
cd User-Authentication-System
Install dependencies:

sh
Copy
Edit
npm install
Create a .env file in the root directory and add:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:

sh
Copy
Edit
npm start
API Endpoints
Method	Endpoint	Description
POST	/api/register	Register a new user
POST	/api/login	User login & get JWT token
GET	/api/protected	Access protected data
POST	/api/logout	Logout user
Postman Collection
To test the API endpoints using Postman, click the button below:
🔗 Postman Collection
(https://www.postman.com/dhanushpandian/workspace/my-workspace/collection/33341630-ac109062-d3c3-46ec-9a48-bfe05108d498?action=share&creator=33341630)

License
This project is open-source and licensed under the MIT License.

Author
👤 Dhanush Dhanush
