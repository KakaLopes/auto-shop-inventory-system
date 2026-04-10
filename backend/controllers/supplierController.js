const db = require("../config/db");

// GET all suppliers
const getAllSuppliers = (req, res) => {
  const query = "SELECT * FROM suppliers ORDER BY created_at DESC";

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch suppliers",
        error: error.message,
      });
    }

    res.status(200).json(results);
  });
};

// CREATE new supplier
const createSupplier = (req, res) => {
  const { name, phone, email, address } = req.body;

  const query = `
    INSERT INTO suppliers (name, phone, email, address)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, phone, email, address], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to create supplier",
        error: error.message,
      });
    }

    res.status(201).json({
      message: "Supplier created successfully",
      supplierId: result.insertId,
    });
  });
};

module.exports = {
  getAllSuppliers,
  createSupplier,
};