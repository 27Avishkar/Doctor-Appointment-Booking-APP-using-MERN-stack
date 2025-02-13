# 🏥 DocTime - Doctor Appointment Management System

DocTime is a **MERN stack** web application that allows users to book doctor appointments, while admins can manage doctors, appointments, and cancellations.

## 🚀 Features

### 🏥 User Features
- Register/Login as a patient.
- Book appointments with available doctors.
- View upcoming and past appointments.
- Cancel booked appointments.

### 🔐 Admin Features
- Login as Admin.
- Add and manage doctors.
- View all patient appointments.
- Cancel appointments when needed.

### 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **Storage:** Cloudinary (for image uploads)
- **UI Components:** React-Toastify (for notifications)

---

## 🎯 Install Dependancies
### 📌 Backend
```sh
cd api
npm install
```

### 📌 Frontend
```sh
cd client
npm install
```

### 📌 Admin
```sh
cd admin
npm install
```
---

##  Start the Project
### 📌 Start Backend Server
```sh
cd api
npm start server.js
```

### 📌 Start Frontend
```sh
cd client
npm run dev
```

### 📌 Start Admin Panel
```sh
cd admin
npm run dev
```
---
## 📌 API Endpoints
### 🔑 Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login as a user
### 👨‍⚕️ Admin
- POST /api/admin/add-doctor - Add a new doctor
- GET /api/admin/doctors - Get all doctors
- POST /api/admin/cancel-appointment - Cancel an appointment
### 🏥 Appointments
- POST /api/appointments/book - Book an appointment
- GET /api/appointments/user/:userId - Get user appointments
- DELETE /api/appointments/:id - Cancel an appointment
