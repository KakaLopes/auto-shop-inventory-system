const db = require("../config/db");

// GET low stock parts
const getLowStockParts = (req, res) => {
  const query = `
    SELECT 
      parts.id,
      parts.name,
      parts.part_code,
      parts.category,
      parts.quantity,
      parts.minimum_stock,
      suppliers.name AS supplier_name
    FROM parts
    LEFT JOIN suppliers ON parts.supplier_id = suppliers.id
    WHERE parts.quantity <= parts.minimum_stock
    ORDER BY parts.quantity ASC
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch low stock parts",
        error: error.message,
      });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getLowStockParts,
};