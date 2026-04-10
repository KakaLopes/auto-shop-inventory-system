const db = require("../config/db");

// GET all parts
const getAllParts = (req, res) => {
  const query = `
    SELECT 
      parts.id,
      parts.name,
      parts.part_code,
      parts.category,
      parts.quantity,
      parts.minimum_stock,
      parts.created_at,
      suppliers.name AS supplier_name
    FROM parts
    LEFT JOIN suppliers ON parts.supplier_id = suppliers.id
    ORDER BY parts.created_at DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch parts",
        error: error.message,
      });
    }

    res.status(200).json(results);
  });
};

// CREATE new part
const createPart = (req, res) => {
  const { name, part_code, category, quantity, minimum_stock, supplier_id } = req.body;

  const query = `
    INSERT INTO parts (name, part_code, category, quantity, minimum_stock, supplier_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, part_code, category, quantity, minimum_stock, supplier_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to create part",
          error: error.message,
        });
      }

      res.status(201).json({
        message: "Part created successfully",
        partId: result.insertId,
      });
    }
  );
};

module.exports = {
  getAllParts,
  createPart,
};