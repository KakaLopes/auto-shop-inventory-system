const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const supplierRoutes = require("./routes/supplierRoutes");
const partRoutes = require("./routes/partRoutes");
const stockEntryRoutes = require("./routes/stockEntryRoutes");
const stockExitRoutes = require("./routes/stockExitRoutes");
const alertRoutes = require("./routes/alertRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auto-shop-inventory-system.vercel.app",
      "https://auto-shop-inventory-system-git-main-kakalopes-projects.vercel.app",
      "https://auto-shop-inventory-system-o3v5ysrcr-kakalopes-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/suppliers", supplierRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/stock-entries", stockEntryRoutes);
app.use("/api/stock-exits", stockExitRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Auto Shop Inventory System API is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});