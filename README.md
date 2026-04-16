# 🚗 Auto Shop Inventory Management System

This project is a full-stack web application developed to manage inventory for auto shops and small businesses.

It allows users to track parts, suppliers, stock entries and exits, and monitor low stock items in a simple and efficient way.

---

## 🚀 Live Demo

Frontend & Backend:
👉 https://auto-shop-inventory-system.onrender.com

---

## 📌 Features

- 🔐 User Authentication (Login with JWT)
- 📊 Dashboard with real-time summary
- 📦 Parts Management
- 🏢 Supplier Management
- 📥 Stock Entry (incoming products)
- 📤 Stock Exit (outgoing products)
- ⚠️ Low Stock Alerts
- 📜 Movement History
- 🔒 Route Protection (authenticated access only)
- ✅ Form validation on all inputs
- 🔄 Loading and error handling

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MySQL

### Deployment
- Render (Frontend & Backend)
- Aiven (MySQL Database)

---

## 🧱 Project Structure

```
frontend/
  ├── components/
  ├── utils/
  └── pages/

backend/
  ├── controllers/
  ├── routes/
  ├── config/
  └── server.js
```

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in browser storage
- Protected routes
- Auto logout on invalid/expired token

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/KakaLopes/auto-shop-inventory-system.git
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in backend:

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

### 4. Run the project

Backend:
```bash
npm start
```

Frontend:
```bash
npm run dev
```

---

## 📱 Responsiveness

The system is responsive and works on:
- Desktop 💻
- Tablet 📱
- Mobile 📱

---

## 🎓 Project Purpose

This project was developed as part of a Software Engineering course to demonstrate:

- Full-stack development
- API integration
- Authentication and security
- Database management
- Real-world business logic

---

## 👩‍💻 Author

**Catalina Lopes**

---

## 📌 Future Improvements

- User registration screen
- Role-based access (Admin/User)
- Export reports (PDF / Excel)
- Advanced filters and analytics