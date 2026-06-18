# 🎯 Real-Time Expert Session Booking System

A full-stack real-time expert session booking platform built with React, Node.js, Express, MongoDB, and Socket.io.

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## 🌐 Live Demo

- **Frontend:** https://realtime-expert-session-booking-sys.vercel.app
- **Backend API:** https://expert-booking-backend-qg8q.onrender.com

## 📌 Features

### 1️⃣ Expert Listing Screen
- Display experts with name, category, experience, and rating
- Search experts by name
- Filter by category (Design, Engineering, Marketing, Finance)
- Pagination (6 experts per page)
- Proper loading and error states

### 2️⃣ Expert Detail Screen
- Full expert profile with bio, experience, and rating
- Available time slots grouped by date
- **Real-time slot updates** — slots disable instantly when booked by another user (Socket.io)

### 3️⃣ Booking Screen
- Form fields: Name, Email, Phone, Date, Time Slot, Notes
- Client-side validation for all fields
- Success confirmation screen after booking
- Booked slots are disabled and cannot be selected

### 4️⃣ My Bookings Screen
- View all bookings by email
- Update booking status: Pending → Confirmed → Completed
- Cancel bookings with real-time slot release
- Active and cancelled bookings separated

## ⚠️ Critical Features

### 🔒 Double Booking Prevention
Uses **atomic MongoDB `findOneAndUpdate`** to prevent race conditions:
```js
const updated = await Expert.findOneAndUpdate(
  { _id: expertId, 'availableSlots.date': date, 
    'availableSlots.time': timeSlot, 'availableSlots.isBooked': false },
  { $set: { 'availableSlots.$.isBooked': true } },
  { new: true }
)
if (!updated) return res.status(409).json({ error: 'Slot already booked' })
```

### ⚡ Real-Time Updates (Socket.io)
- When a slot is booked → all connected users see it disabled instantly
- When a booking is cancelled → slot becomes available instantly for all users

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Real-time | Socket.io |
| Deployment | Vercel (Frontend), Render (Backend) |

## 📁 Project Structure

```
realtime-expert-booking/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── expertController.js
│   │   │   └── bookingController.js
│   │   ├── models/
│   │   │   ├── Expert.js
│   │   │   └── Booking.js
│   │   ├── routes/
│   │   │   ├── expertRoutes.js
│   │   │   └── bookingRoutes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── seedData.js
│   │   └── socket.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── ExpertList.jsx
    │   │   ├── ExpertDetail.jsx
    │   │   ├── Booking.jsx
    │   │   └── MyBookings.jsx
    │   ├── components/
    │   │   ├── ExpertCard.jsx
    │   │   ├── SlotPicker.jsx
    │   │   ├── BookingForm.jsx
    │   │   └── StatusBadge.jsx
    │   ├── hooks/
    │   │   └── useSocket.js
    │   └── api/
    │       └── axios.js
    └── .env
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/experts` | Get all experts (pagination + filter + search) |
| GET | `/experts/:id` | Get single expert with slots |
| POST | `/bookings` | Create a new booking |
| PATCH | `/bookings/:id/status` | Update booking status |
| GET | `/bookings?email=` | Get bookings by email |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
```

Seed the database:
```bash
node src/utils/seedData.js
```

Start the server:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Start the dev server:
```bash
npm run dev
```

## 👨‍💻 Author

**Pratham Bagri**
- GitHub: [@prathambagri](https://github.com/prathambagri)
- LinkedIn: [pratham-bagri](https://linkedin.com/in/pratham-bagri)
- Email: prathambagri2017@gmail.com
