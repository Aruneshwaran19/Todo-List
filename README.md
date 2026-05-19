# MERN Todo App

A full stack Todo List app with user login and registration. Each user manages their own tasks.

---

## Tech Stack

- **Frontend** — React, React Router, Axios, Vite
- **Backend** — Node.js, Express.js
- **Database** — MongoDB, Mongoose
- **Auth** — JWT, bcryptjs


---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
```

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

---

## Features

- User Registration and Login
- JWT Authentication
- Each user sees only their own tasks
- Add, complete and delete tasks
- Filter by All / Active / Completed
- Stats — Total, Done, Pending
- Data persists in MongoDB
