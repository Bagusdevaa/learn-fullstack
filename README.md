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
- `id` (INTEGER, PRIMARY KEY)
- `nip` (INTEGER, FOREIGN KEY)
- `tanggal` (DATE)
- `checkin` (TIME)
- `checkout` (TIME)

## 🔗 API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user (register)
- `PUT /users` - Update user profile
- `POST /users/login` - User login

### Absensi
- `GET /absensi` - Get all attendance records
- `POST /absensi/:type` - Create attendance (checkin/checkout)