User Authentication System

Overview

A minimal and secure user authentication system developed with Node.js, Express.js, and MongoDB. It has support for user registration, login, authentication, and protected routes.

Features

User Registration

User Login with JWT Authentication

Password Hashing (bcrypt)

Protected Routes

Logout Functionality

MongoDB Database Integration

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT (JSON Web Token), bcrypt

Installation

Prerequisites

Node.js installed

MongoDB database (local or Atlas)

Steps

Clone the repository:
git clone https://github.com/DhanushDhanush2001/User-Authentication-System.git
cd User-Authentication-System

Install dependencies:

npm install

Create a.env file and set the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:

npm start

API Endpoints

Method

Endpoint

Description

POST

/api/register

Register a new user

POST

/api/login

User login & token

GET

/api/protected

Access protected data

POST

/api/logout

Logout user

Postman Collection

## Postman Collection
To test the API endpoints using **Postman**, click the button below:

(https://www.postman.com/dhanushpandian/workspace/my-workspace/collection/33341630-ac109062-d3c3-46ec-9a48-bfe05108d498?action=share&creator=33341630)
License

This project is open-sourced and licensed under the MIT License.

Author

Dhanush Dhanush
