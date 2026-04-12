
# 🔧 Auto Shop Inventory System - Backend

This backend is part of a full-stack inventory management system designed for auto repair shops.

It provides secure APIs for managing parts, suppliers, stock movements, and real-time inventory tracking.

---

## 🚀 Features

* 🔐 Authentication (JWT)
* 👥 Protected routes
* 📦 Parts management (CRUD)
* 🏭 Suppliers management (CRUD)
* 📥 Stock entry (with date support)
* 📤 Stock exit (with validation and date support)
* ⚠️ Low stock alerts
* 📊 Dashboard summary
* 📜 Movement history (entries & exits)
* 🔄 Automatic stock updates

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* dotenv

---

## ⚙️ Installation

git clone <your-repo>
cd backend
npm install

---

## 🔑 Environment Variables

Create a `.env` file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auto_shop
JWT_SECRET=your_secret_key

---

## ▶️ Run the Server

npm run dev

Server will run at:
http://localhost:5000

---

## 🔐 Authentication

Login returns a token:

{
"token": "your_jwt_token"
}

Use it in requests:

Authorization: Bearer your_token

---

## 📡 Main Endpoints

Auth
POST /api/auth/login
POST /api/auth/register

Parts
GET /api/parts
POST /api/parts

Suppliers
GET /api/suppliers
POST /api/suppliers

Stock
POST /api/stock-entries
POST /api/stock-exits

Alerts
GET /api/alerts/low-stock

Dashboard
GET /api/dashboard/summary

---

## 🧠 Business Logic

* Stock entries increase quantity
* Stock exits decrease quantity
* Prevents negative stock
* Supports manual or automatic timestamps

---

## 📌 Status

✔️ Fully functional
✔️ Ready for production improvements
✔️ Built for academic project (TCC)

---

## 👩‍💻 Author

Catalina Lopes
Software Engineering Student

