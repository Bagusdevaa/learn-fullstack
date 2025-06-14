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
npm start
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

## 🎯 Features

### Current Features
- ✅ User registration & login
- ✅ User authentication with localStorage
- ✅ Dashboard with user info
- ✅ Profile editing (name & password)
- ✅ Basic attendance system
- ✅ Protected routes
- ✅ Responsive UI with Bootstrap

### Planned Features (Issues)
- [ ] UI improvements for dashboard
- [ ] Input validation on frontend
- [ ] Custom 404 page component
- [ ] Login page validation (prevent access when logged in)
- [ ] Date formatting for attendance
- [ ] Attendance validation (1 checkin/checkout per day)

## 🔧 Development

### Running Both Servers
```bash
# Terminal 1 - Backend
cd express-api && npm start

# Terminal 2 - Frontend  
cd react-client && npm start
```

### Building for Production
```bash
cd react-client
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Todo List

Berdasarkan tugas tutorial:
1. **UI Enhancement** - Buat dashboard lebih menarik dan sesuai fungsi
2. **Data Validation** - Validasi invalid data dari frontend  
3. **404 Component** - Bikin component UI untuk Page Not Found
4. **Login Validation** - Validasi halaman login (tidak bisa diakses jika sudah login)
5. **Date Conversion** - Convert tanggal absen menjadi format yang user-friendly
6. **Attendance Rules** - Validasi sistem absensi (1 orang hanya bisa absen 1x checkin 1x checkout dalam 1 hari)

## 📄 License

This project is for educational purposes.

---
**Author**: [Your Name]  
**Tutorial**: Fullstack JavaScript Development