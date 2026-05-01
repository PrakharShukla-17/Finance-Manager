# 💰 Finance Manager

> *Because tracking money in your head has never worked for anyone.*

A full-stack personal finance manager app built to take control of your expenses, income, and everything in between. Secure, validated, and built with care by **Prakhar**.

🚀 **Live Demo** — *Coming soon!*

---

## 🧠 Why This Exists

Honestly? To learn React properly.

There's only so much you can absorb from tutorials and docs before you need to just *build something*. And what better thing to build than an app you'd actually use yourself? Finance management is personal, practical, and complex enough to push your skills — it needs real auth, real validation, real data. No shortcuts.

So here it is. A project that started as a learning exercise and turned into something genuinely useful.

---

## ✨ Features

- 💸 Track income and expenses in one place
- 📊 Get a clear picture of where your money is going
- 🔐 Secure authentication — your data stays yours
- 🛡️ Passwords hashed and protected
- ✅ Input validation so bad data never reaches the database
- 📱 Clean, responsive UI

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

### Auth & Security
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-6D28D9?style=for-the-badge&logoColor=white)

### Validation
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

### Coded by
![Prakhar](https://img.shields.io/badge/Prakhar-doing%20his%20best-brightgreen?style=for-the-badge)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/transactions` | Fetch all transactions |
| `POST` | `/api/transactions` | Add a new transaction |
| `PATCH` | `/api/transactions/:id` | Update a transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/finance-manager.git
cd finance-manager
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 🗺️ Roadmap

- [x] User authentication with JWT
- [x] Password hashing with Bcrypt
- [x] Input validation with Zod
- [x] Add / delete transactions
- [ ] Deploy live
- [ ] Dashboard with charts and spending breakdown
- [ ] Monthly summaries and reports
- [ ] Budget goals and alerts
- [ ] Export data as CSV

---

## 📖 What I Learned

- How React state and component architecture actually clicks when you build something real
- Wiring up JWT auth end to end — from login to protected routes
- Why validation on the backend matters even when your frontend looks fine
- That Zod makes you feel like you actually have control over your data
- Bcrypt is non-negotiable. Plain text passwords are a crime.

---

## 📄 License

MIT — use it, fork it, learn from it.

---

<div align="center">

Made with ☕ and financial anxiety by **Prakhar**

⭐ If this helped you or you just like the code, drop a star!

</div>
