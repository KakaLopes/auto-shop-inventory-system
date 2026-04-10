const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const supplierRoutes = require("./routes/supplierRoutes");
const partRoutes = require("./routes/partRoutes");
const stockEntryRoutes = require("./routes/stockEntryRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/stock-entries", stockEntryRoutes);

app.get("/", (req, res) => {
  res.send("Auto Shop Inventory System API is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});