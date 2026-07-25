# 🎯 AI-Powered Real-Time Expert Session Booking Platform

A full-stack real-time expert session booking platform built with **React, Node.js, Express, MongoDB, Socket.IO, Clerk Authentication, and Google Gemini AI**. The platform enables users to discover experts, book live sessions, receive AI-powered recommendations, prepare for sessions with AI, and manage bookings with real-time updates.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge)

---

# 🌐 Live Demo

### Frontend
https://realtime-expert-session-booking-sys.vercel.app

### Backend API
https://expert-booking-backend-qg8q.onrender.com

---

# ✨ Features

## 👨‍💼 Expert Discovery

- Browse experts by category
- Search experts by name
- Filter by category
- Pagination
- Expert profile with experience, rating, and bio
- View available time slots

---

## 🤖 AI Features

### AI Expert Finder

Users describe their problem or goal, and Gemini AI recommends the most suitable experts based on their requirements.

**Includes:**

- Best expert recommendations
- Match percentage
- Recommendation reasoning
- Expert strengths

---

### AI Improve My Problem

Before booking, users can improve their booking description using AI.

Gemini:

- Rewrites the description professionally
- Preserves the original meaning
- Improves grammar and clarity
- Does not change the user's intent

---

### AI Learning Assistant

After selecting an expert, users can generate a personalized preparation plan.

It generates:

- 📄 Session Summary
- ✅ Session Checklist
- ❓ Questions to Ask
- 💡 Preparation Tips

This helps users prepare before meeting the expert without replacing the expert.

---

# 📅 Booking System

- Book live expert sessions
- Real-time slot availability
- Client-side validation
- Booking confirmation page
- Email confirmation after booking
- Prevent double booking
- Automatic slot reservation

---

# 📖 My Bookings

Users can:

- View bookings using email
- Cancel pending or confirmed bookings
- View completed sessions
- View cancelled sessions
- Track booking status

Booking workflow:

```
Pending
    ↓
Confirmed
    ↓
Completed
```

or

```
Pending
    ↓
Cancelled
```

Completed sessions automatically free the booked slot for future bookings.

---

# 👨‍💻 Admin Dashboard

Admin can:

- View all bookings
- Update booking status

Statuses:

- Pending
- Confirmed
- Completed
- Cancelled

When a booking is:

### Cancelled

- Slot becomes available again
- Cancellation email is sent
- Socket event updates all connected users

### Completed

- Slot becomes available again
- Session moves to Completed
- Cancel button disappears for the user

---

# ⚡ Real-Time Features

Powered by **Socket.IO**

- Live slot booking
- Instant slot availability updates
- Automatic slot release
- Synchronization across connected users

---

# 🔒 Double Booking Prevention

Uses an atomic MongoDB operation:

```js
const updated = await Expert.findOneAndUpdate(
  {
    _id: expertId,
    "availableSlots.date": date,
    "availableSlots.time": timeSlot,
    "availableSlots.isBooked": false,
  },
  {
    $set: {
      "availableSlots.$.isBooked": true,
    },
  },
  { new: true }
);
```

This prevents race conditions and ensures that the same slot cannot be booked twice.

---

# 📧 Email Notifications

Automatic emails are sent for:

- Booking confirmation
- Booking cancellation

---

# 🔐 Authentication

Implemented using **Clerk**.

Features:

- Secure authentication
- Protected pages
- Sign-in modal
- User session management

---

# 🛠 Tech Stack

## Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Axios
- Framer Motion
- Clerk Authentication
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- Nodemailer
- Google Gemini AI

---

# 📁 Project Structure

```
realtime-expert-session-booking/

├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── socket.js
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   └── .env
│
└── README.md
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/experts` | Get experts |
| GET | `/experts/:id` | Get expert details |
| POST | `/bookings` | Create booking |
| PATCH | `/bookings/:id/status` | Update booking status |
| GET | `/bookings?email=` | Get bookings |
| POST | `/api/ai/recommend` | AI Expert Finder |
| POST | `/api/ai/improve-booking` | Improve booking description |
| POST | `/api/ai/prepare` | AI Learning Assistant |

---

# 🚀 Installation

## Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```env
PORT=
MONGO_URI=
CLIENT_URL=
GEMINI_API_KEY=
CLERK_SECRET_KEY=
EMAIL_USER=
EMAIL_PASS=
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env`

```env
VITE_API_URL=
VITE_SOCKET_URL=
VITE_CLERK_PUBLISHABLE_KEY=
```

---

# 🚀 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Expert Details
- AI Expert Finder
- Booking Form
- AI Improve My Problem
- Booking Confirmation
- AI Learning Assistant
- My Bookings
- Admin Dashboard

---

# 🔮 Future Enhancements

- Video meeting integration
- Payment gateway
- Calendar integration
- Expert reviews and ratings
- Session reminders
- Expert analytics dashboard
- AI-generated session recap

---

# 👨‍💻 Author

**Pratham Bagri**

📧 Email: prathambagri2017@gmail.com

🔗 GitHub: https://github.com/prathambagri

🔗 LinkedIn: https://linkedin.com/in/pratham-bagri

---

# ⭐ If you found this project useful, consider giving it a star on GitHub!
