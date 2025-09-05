# MentorView - Student Evaluation Management System

A comprehensive full-stack web application designed for academic institutions to streamline the student evaluation process. The system enables mentors to efficiently evaluate students across multiple parameters with built-in business rule enforcement and automated reporting capabilities.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-18.18.1-green.svg)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Business Logic](#business-logic)

## Overview

MentorView is built to address the challenges of academic project evaluation in educational institutions. The system manages the complete evaluation workflow from student-mentor assignment to final report generation, ensuring data integrity and process consistency.

### Problem Statement
- Manual evaluation processes are time-consuming and error-prone
- Inconsistent evaluation criteria across different mentors
- Difficulty in tracking evaluation progress and generating reports
- Need for systematic enforcement of academic policies

### Solution
A web-based evaluation platform that automates assignment management, enforces business rules, provides real-time validation, and generates comprehensive reports.

<img width="2559" height="1173" alt="image" src="https://github.com/user-attachments/assets/08414bae-3c63-4833-82d6-a8be4cfa0360" />

<img width="2559" height="1172" alt="image" src="https://github.com/user-attachments/assets/a1c6d77b-58d2-4e9e-8a9d-3a964067972c" />



## Key Features

### Core Functionality
- **Multi-Parameter Evaluation System**: Flexible evaluation across customizable parameters (Ideation, Execution, Viva/Pitch, Documentation)
- **Student-Mentor Assignment Management**: Automated assignment with capacity constraints (3-4 students per mentor)
- **Multiple Mentor Support**: System supports multiple mentors with independent evaluation workflows
- **Real-time Input Validation**: Prevents invalid data entry with immediate feedback
- **Progress Tracking**: Visual indicators for evaluation completion status

### Advanced Features
- **Business Rule Enforcement**: Automatic validation of minimum student requirements and evaluation completeness
- **PDF Report Generation**: Professional marksheet generation with complete evaluation data
- **Email Notifications**: Automated student notifications upon evaluation completion
- **Data Integrity**: Comprehensive database constraints and validation layers
- **Responsive Design**: Mobile-friendly interface optimized for various devices

### Security & Data Management
- **Locked Submissions**: Prevents modification after final submission
- **Cascading Data Management**: Proper relationship handling with automatic cleanup
- **Error Handling**: Comprehensive error management with user-friendly messages

## System Architecture

### Technology Stack

**Frontend**
- React 18.2.0 with functional components and hooks
- React Router v6 for client-side navigation
- Tailwind CSS 3.4.0 for responsive styling
- Context API for state management
- Custom hooks for reusable logic abstraction

**Backend**
- Node.js 18.18.1 runtime environment
- Express.js web application framework
- RESTful API design with proper HTTP methods
- Middleware for validation and error handling

**Database & ORM**
- PostgreSQL relational database
- Prisma ORM 6.15.0 for type-safe database operations
- Database migrations and seeding capabilities

**Additional Libraries**
- PDFKit for document generation
- Nodemailer for email services
- Express validation middleware

### System Flow
```
Client (React) → API Layer (Express) → Business Logic (Services) → Database (PostgreSQL)
      ↑                ↑                      ↑                         ↑
   UI Components    Controllers           Services                 Prisma ORM
   State Management  Route Handlers       Business Rules           Data Models
```

## Database Design

### Entity Relationship Model
```
Mentors (1:N) ← Assignments → (1:1) Students
                    ↓
                  Marks (N:1) → EvaluationParameters
```

### Key Entities
- **Mentors**: Store mentor information and contact details
- **Students**: Student profiles with unique identifiers
- **Assignments**: Junction entity managing mentor-student relationships
- **EvaluationParameters**: Configurable evaluation criteria with maximum marks
- **Marks**: Individual scores for each parameter per assignment

### Database Constraints
- Unique constraint on student assignments (one mentor per student)
- Composite unique constraint on marks (one score per parameter per assignment)
- Cascade delete relationships for data consistency
- Required fields and validation rules

## Installation

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL database instance
- Git version control

### Setup Process

1. **Clone Repository**
   ```bash
   git clone https://github.com/medss19/MentorView.git
   cd MentorView
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create `.env` file in backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/mentorview"
   PORT=5000
   NODE_ENV=development
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your_email@gmail.com"
   EMAIL_PASS="your_app_password"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   ```

7. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Mentors
1. **Dashboard Access**: View evaluation overview and progress statistics
2. **Student Management**: Assign and manage student evaluations (3-4 student capacity)
3. **Evaluation Process**: Score students across defined parameters with real-time validation
4. **Progress Monitoring**: Track completion status for all assigned students
5. **Final Submission**: Submit all evaluations once complete (triggers email notifications)
6. **Report Generation**: Download comprehensive PDF marksheets

### System Workflow
1. Mentors are assigned to the system with unique credentials
2. Students are loaded into the available student pool
3. Mentors select and assign students (system enforces 3-4 student limit)
4. Evaluation is conducted across all defined parameters
5. System validates all evaluations are complete before allowing submission
6. Final submission locks all data and triggers automated notifications
7. PDF reports are generated for administrative use

## API Documentation

### Core Endpoints
```
GET    /api/assignments/mentor/:mentorId     # Retrieve mentor's assigned students
POST   /api/assignments/assign              # Assign student to mentor
DELETE /api/assignments/:assignmentId       # Remove student assignment
POST   /api/marks                           # Submit/update evaluation marks
POST   /api/assignments/mentor/:mentorId/submit  # Final evaluation submission
GET    /api/reports/marksheet/:mentorId     # Generate and download PDF report
```

### Supporting Endpoints
```
GET    /api/mentors                         # List all mentors
GET    /api/students/available              # Get unassigned students
GET    /api/parameters                      # Retrieve evaluation parameters
GET    /api/reports/summary/:mentorId       # Get evaluation statistics
```

## Project Structure

```
MentorView/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema definition
│   │   └── seed.js               # Initial data population
│   ├── src/
│   │   ├── controllers/          # HTTP request handlers
│   │   ├── services/             # Business logic implementation
│   │   ├── routes/               # API endpoint definitions
│   │   ├── middlewares/          # Validation and error handling
│   │   ├── utils/                # Utility functions (PDF, email)
│   │   └── server.js             # Application entry point
│   ├── checkDB.js                # Database inspection utility
│   └── cleanDB.js                # Development database cleanup
└── frontend/
    ├── src/
    │   ├── components/           # Reusable UI components
    │   ├── pages/                # Main application views
    │   ├── context/              # Global state management
    │   ├── hooks/                # Custom React hooks
    │   ├── services/             # API communication layer
    │   └── App.js                # Root application component
    └── public/                   # Static assets and HTML template
```

## Business Logic

### Assignment Rules
- Each mentor can evaluate between 3-4 students (configurable constraint)
- Students cannot be assigned to multiple mentors simultaneously
- Minimum 3 students required before final submission
- All assigned students must be fully evaluated before submission

### Evaluation Rules
- Each student evaluated across all defined parameters
- Marks cannot exceed maximum values for each parameter
- Real-time validation prevents invalid data entry
- Evaluation progress tracked and displayed to mentors

### Submission Rules
- All-or-nothing submission model (all students must be complete)
- Submission locks all evaluation data permanently
- Automated email notifications sent to all evaluated students
- PDF reports generated only after successful submission

### Data Integrity
- Database-level constraints prevent invalid relationships
- Cascading deletes maintain referential integrity
- Transaction-based operations ensure consistency
- Comprehensive error handling with rollback capabilities

## Development Features

### Database Utilities
- `checkDB.js`: Inspect current database state and relationships
- `cleanDB.js`: Reset evaluation data for development testing
- Prisma migration system for schema updates
- Seeding system for consistent development data

### Error Handling
- Comprehensive validation at API endpoints
- User-friendly error messages
- Proper HTTP status codes
- Development vs production error details

### Performance Considerations
- Database indexing on frequently queried fields
- Optimized database queries with proper includes
- Connection pooling for database efficiency
- Component-level optimization in React frontend

---

## Author

**Medha Agarwal**
- GitHub: [@medss19](https://github.com/medss19)
- Project Repository: [MentorView](https://github.com/medss19/MentorView)

## License

This project is developed for educational and demonstration purposes.
