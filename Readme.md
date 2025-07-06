# Project Management Tool - MERN Stack

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.2-blue)
![React](https://img.shields.io/badge/React-v19.0.0-blue)
![Redux](https://img.shields.io/badge/Redux-v9.2.0-purple)
![Express](https://img.shields.io/badge/Express-v4.21.2-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.13.0-green)

A full-featured project management application with user authentication, project tracking, and task management built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Features

- **User Authentication**

  - JWT-based registration and login
  - Password hashing with bcryptjs
  - Protected routes

- **Project Management**

  - Create, view, update, and delete projects
  - Project status tracking (active/completed)
  - Project details with descriptions

- **Task Management**

  - Task CRUD operations
  - Status tracking (todo/in-progress/done)
  - Due date management
  - Task filtering by status

- **Additional Features**
  - Redux for state management
  - Form validation with React Hook Form + Zod
  - Responsive UI with Tailwind CSS
  - Seeder script for initial data
  - TypeScript throughout the application

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pankajkandpal99/project-management.git
cd project-management
```

2. Install server dependencies:
   cd backend
   npm install

3. Install client dependencies:
   cd frontend
   npm install

4. Set up environment variables:
   Create .env files in both client and server directories

Example server .env:

# Server configuration

PORT=8800
NODE_ENV=development
BASE_URL=http://localhost:8800

# Authentication

JWT_SECRET=your_jwt_secret_here
COOKIE_DOMAIN=localhost

# Database

DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# CORS

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8800

Running the Application

1. Start the server:
   cd backend
   npm run dev

2. Start the client:
   cd frontend
   npm run dev

## 🚀 Future Enhancements

Docker Integration: Containerize the application for easier deployment and development environment setup

Pagination: Implement server-side pagination for projects and tasks lists

Unit Testing: Add comprehensive test suites using Jest and React Testing Library

Real-time Updates: Implement WebSocket support for collaborative features

Advanced Search: Add full-text search capabilities across projects and tasks

User Roles: Implement role-based access control (RBAC) for team collaboration

File Attachments: Allow file uploads for tasks and projects

Performance Monitoring: Add APM tools for performance tracking

---

## 🤝 Contributing

1. **Fork** the project
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   git commit -m "Add some AmazingFeature"
4. Push to the branch
   git push origin feature/AmazingFeature
5. Open a Pull Request

---
