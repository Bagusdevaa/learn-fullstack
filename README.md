# Fullstack Absensi App

Mini aplikasi absensi dengan Express.js backend dan React.js frontend.

## 📁 Project Structure
```
fullstack/
├── express-api/        # Backend API
│   ├── server.js      # Main server file
│   ├── db.config.js   # Database configuration
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   └── utils/         # Utility functions
└── react-client/      # Frontend React app
    ├── src/
    ├── public/
    └── build/         # Production build
```

## 🚀 Tech Stack

### Backend (Express API)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database
- **MySQL** - Database
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend (React Client)
- **React.js** - Frontend framework
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Typewriter Effect** - Animation library

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Backend Setup
```bash
cd express-api
npm install
```

1. Create `.env` file in `express-api/` folder:
```env
DB_NAME=absensi
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3200
```

2. Start the backend server:
```bash
npm run api
```

Backend will run on `http://localhost:3200`

### Frontend Setup
```bash
cd react-client
npm install
npm start
```

Frontend will run on `http://localhost:3000`

## 📊 Database Schema

### Users Table
- `nip` (INTEGER, UNIQUE) - Employee ID
- `nama` (STRING) - Full name
- `password` (STRING) - Hashed password

### Absensi Table
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- `users_nip` (INTEGER, FOREIGN KEY) - Reference to Users table
- `status` (STRING) - 'in' for check-in, 'out' for check-out
- `createdAt` (DATETIME) - Timestamp when record was created
- `updatedAt` (DATETIME) - Timestamp when record was last updated

## 🔗 API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user (register)
- `PUT /users` - Update user profile
- `POST /users/login` - User login

### Absensi
- `GET /absensi` - Get all attendance records (admin)
- `POST /absensi/checkin` - Check-in attendance
- `POST /absensi/checkout` - Check-out attendance
- `GET /absensi/user/:nip` - Get attendance records for specific user

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```bash
POST /users
Content-Type: application/json

{
    "nip": "12345",
    "nama": "John Doe",
    "password": "mypassword"
}
```

#### Login User
```bash
POST /users/login
Content-Type: application/json

{
    "nip": "12345",
    "password": "mypassword"
}
```

#### Update Profile
```bash
PUT /users
Content-Type: application/json

{
    "nip": "12345",
    "nama": "John Doe Updated",
    "password": "current_password",
    "passwordBaru": "new_password"
}
```

### Attendance Endpoints

#### Check-in
```bash
POST /absensi/checkin
Content-Type: application/json

{
    "nip": "12345"
}
```

#### Check-out
```bash
POST /absensi/checkout
Content-Type: application/json

{
    "nip": "12345"
}
```

#### Get User Attendance
```bash
GET /absensi/user/12345
```

Response:
```json
{
    "absensi": [
        {
            "id": 1,
            "users_nip": "12345",
            "status": "in",
            "createdAt": "2025-01-15T08:30:00.000Z",
            "updatedAt": "2025-01-15T08:30:00.000Z"
        }
    ],
    "count": 1,
    "metadata": "Absensi data for user 12345"
}
```

## 🔒 Validation Rules

### Working Hours
- **Days**: Monday to Friday only
- **Time**: 8:00 AM to 5:00 PM (17:00)
- **Timezone**: Local server time

### Daily Limits
- Maximum 1 check-in per day
- Maximum 1 check-out per day
- Must check-in before check-out

### Input Validation
- **NIP**: Required, numeric only, minimum 4 digits
- **Password**: Required for login and registration
- **Name**: Required for registration and profile updates

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
    "error": "Error message description"
}
```

Common error codes:
- `400` - Bad Request (validation errors)
- `404` - Not Found (user not found)
- `500` - Internal Server Error

## 🎯 Frontend Routes

- `/` - Home page (landing page)
- `/login` - Login page (redirects if already logged in)
- `/register` - Registration page
- `/dashboard` - Main dashboard (requires authentication)
- `/dashboard/profile` - Edit profile page
- `*` - 404 Not Found page

## ✨ Features

### Authentication & Authorization
- User registration with encrypted passwords
- Secure login system
- User-specific data access (users can only see their own attendance)

### Attendance Management
- **Working Hours Validation**: Only allows check-in/out during business hours (8 AM - 5 PM, Monday-Friday)
- **Daily Limits**: Prevents multiple check-ins or check-outs on the same day
- **Sequential Validation**: Users must check-in before they can check-out
- **Real-time Status**: Dashboard shows current day's attendance status

### Frontend Features
- **Modern UI**: Responsive design with gradient themes
- **Error Handling**: Comprehensive error messages and validation
- **Auto-redirect**: Logged-in users are redirected from login page
- **Date Formatting**: User-friendly date and time display
- **404 Page**: Custom not found page

### Backend Security
- **Input Validation**: All API endpoints validate required fields
- **Error Handling**: Try-catch blocks for all async operations
- **Environment Variables**: Secure database configuration
- **Password Hashing**: bcrypt for password encryption