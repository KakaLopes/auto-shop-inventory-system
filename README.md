# 🚗 Auto Shop Inventory System

A backend system for managing inventory in automotive workshops.
This project was developed as part of a Software Engineering assignment.

---

## 📌 Features

* Manage suppliers
* Manage parts and categories
* Track stock entries (incoming items)
* Track stock exits (used/sold items)
* Automatic stock updates
* Low stock alerts
* Dashboard summary with key metrics

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Nodemon
* Dotenv

---

## 📂 Project Structure

```
backend/
│
├── config/
├── controllers/
├── routes/
├── server.js
├── .env
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/auto-shop-inventory-system.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auto_shop_inventory
DB_PORT=3306
PORT=5000
```

4. Run the server:

```bash
npm run dev
```

---

## 📡 API Endpoints

### Suppliers

* GET /api/suppliers
* POST /api/suppliers

### Parts

* GET /api/parts
* POST /api/parts

### Stock Entries

* GET /api/stock-entries
* POST /api/stock-entries

### Stock Exits

* GET /api/stock-exits
* POST /api/stock-exits

### Alerts

* GET /api/alerts/low-stock

### Dashboard

* GET /api/dashboard/summary

---

## 📊 Example Dashboard Response

```json
{
  "totalParts": 10,
  "totalSuppliers": 5,
  "totalStockEntries": 20,
  "totalStockExits": 15,
  "lowStockItems": 2
}
```

---

## 🚀 Future Improvements

* Frontend interface (React)
* Authentication (JWT)
* Role-based access (Admin/User)
* Reports and export (PDF/Excel)

---

## 👩‍💻 Author

Catalina Lopes
Software Engineering Student
