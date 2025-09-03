# 🎓 MentorView - Evaluation Dashboard System

> **A comprehensive mentor evaluation platform built with React.js and Node.js**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-18.18.1-green.svg)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)

---

## 📋 Project Overview

**MentorView** is a full-stack evaluation dashboard designed for mentors to efficiently evaluate students across multiple parameters. The system enforces business rules, generates comprehensive reports, and provides a seamless user experience.

### 🎯 Key Features

- **📊 Parameter-Based Evaluation** - Flexible evaluation system with customizable parameters
- **👥 Student Management** - Smart assignment limits (3-4 students per mentor)
- **✅ Input Validation** - Real-time validation preventing marks exceeding maximum values
- **📄 PDF Generation** - Professional marksheet generation with complete mentor and student data
- **📧 Email Notifications** - Automated notifications upon evaluation completion
- **🔒 Data Integrity** - Comprehensive database constraints and validation
- **📱 Responsive Design** - Modern, mobile-friendly interface with Tailwind CSS

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **React 18.2.0** - Modern functional components with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS 3.4.0** - Utility-first styling framework
- **Context API** - Centralized state management
- **Custom Hooks** - Reusable logic abstraction

### Backend
- **Node.js 18.18.1** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM 6.15.0** - Type-safe database client
- **PostgreSQL** - Relational database (Neon Cloud)
- **PDFKit** - PDF generation library
- **Nodemailer** - Email service integration

### Database Design
```
Mentors ←→ Assignments ←→ Students
    ↓           ↓           ↓
Parameters ←→ Marks ←→ Student_Parameter_Marks
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL database
- Git

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/medss19/MentorView.git
   cd MentorView
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Update .env with your database URL and email configuration
   
   # Setup database
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 🎮 Usage Guide

### For Mentors

1. **Dashboard Access**: Navigate to the evaluation dashboard
2. **Student Assignment**: View your assigned students (3-4 students max)
3. **Parameter Evaluation**: 
   - Evaluate each student across defined parameters
   - Real-time validation prevents marks > maximum values
   - Progress tracking shows completion status
4. **Final Submission**: Submit button appears only when ALL students are evaluated
5. **Report Generation**: Download PDF marksheets with complete evaluation data

### Business Rules Implemented

- ✅ Minimum 3 students required for submission
- ✅ Maximum marks validation per parameter
- ✅ All students must be evaluated before final submission
- ✅ Unique student-assignment constraints
- ✅ Automated email notifications on completion

---

## 📁 Project Structure

```
MentorView/
├── README.md
├── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Custom middleware
│   │   └── utils/           # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Database seeding
│   ├── checkDB.js           # Database verification
│   ├── cleanDB.js           # Database cleanup
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Main pages
    │   ├── context/         # Context providers
    │   ├── hooks/           # Custom hooks
    │   └── services/        # API services
    ├── public/              # Static assets
    └── package.json
```

---

## 🔧 API Endpoints

### Core Functionality
```
GET    /api/mentors/:id/students     # Get assigned students
GET    /api/assignments/:id          # Get assignment details
POST   /api/marks                    # Submit/update marks
POST   /api/assignments/:id/submit   # Final submission
GET    /api/reports/:id/pdf          # Generate PDF report
```

### Data Management
```
GET    /api/parameters              # Get evaluation parameters
GET    /api/students                # Get students list
POST   /api/assignments             # Create new assignment
```

---

## 🎨 Key Components

### Frontend Components
- **`Evaluation.js`** - Main evaluation interface with real-time validation
- **`Dashboard.js`** - Overview and navigation hub
- **`Students.js`** - Student management interface
- **`EvaluationContext.js`** - Centralized state management

### Backend Services
- **`assignmentService.js`** - Core business logic for evaluations
- **`markService.js`** - Marks management and calculations
- **`reportController.js`** - PDF generation and download handling
- **`pdfGenerator.js`** - Custom PDF formatting and creation

---

## 🧪 Database Utilities

### Available Scripts
```bash
# Database verification
node checkDB.js

# Clean database (development)
node cleanDB.js

# Regenerate database
npx prisma db push --force-reset
npx prisma db seed
```

---

## 🔐 Environment Configuration

### Backend (.env)
```env
DATABASE_URL="your_postgresql_connection_string"
PORT=5000
NODE_ENV=development
EMAIL_HOST="smtp.ethereal.email"
EMAIL_PORT=587
EMAIL_USER="your_email_user"
EMAIL_PASS="your_email_password"
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Production Deployment

### Build Commands
```bash
# Frontend build
cd frontend && npm run build

# Backend (already production-ready)
cd backend && npm start
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku
- **Database**: Neon, Supabase

---

## 🎯 Assignment Requirements Fulfilled

- ✅ **Student Limit Enforcement**: 3-4 students per mentor
- ✅ **Parameter-Based Evaluation**: Flexible evaluation system
- ✅ **Input Validation**: Prevents invalid marks entry
- ✅ **Submission Logic**: All-or-nothing final submission
- ✅ **PDF Generation**: Professional marksheet creation
- ✅ **Email Integration**: Automated notifications
- ✅ **Database Design**: Proper relationships and constraints
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Responsive UI**: Mobile-friendly design

---

## 👥 Author

**Medha Agarwal**
- GitHub: [@medss19](https://github.com/medss19)
- Project: [MentorView](https://github.com/medss19/MentorView)

---

## 📄 License

This project is part of an academic assignment and is available for educational purposes.

---

## 🎉 Thank You!

Thank you for reviewing this project! The system demonstrates:
- Full-stack development proficiency
- Modern React patterns and best practices
- RESTful API design
- Database design and management
- Business logic implementation
- Professional code organization

The application is production-ready and showcases real-world development skills. 🚀