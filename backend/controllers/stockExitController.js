const db = require("../config/db");

// GET all stock exits
const getAllStockExits = (req, res) => {
  const query = `
    SELECT 
      stock_exits.id,
      stock_exits.quantity,
      stock_exits.exit_date,
      stock_exits.notes,
      parts.name AS part_name,
      parts.part_code
    FROM stock_exits
    INNER JOIN parts ON stock_exits.part_id = parts.id
    ORDER BY stock_exits.exit_date DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch stock exits",
        error: error.message,
      });
    }

    res.status(200).json(results);
  });
};

// CREATE stock exit and update part quantity
const createStockExit = (req, res) => {
  const { part_id, quantity, notes } = req.body;

  const getPartQuery = "SELECT quantity FROM parts WHERE id = ?";

  db.query(getPartQuery, [part_id], (partError, partResults) => {
    if (partError) {
      return res.status(500).json({
        message: "Failed to check part stock",
        error: partError.message,
      });
    }

    if (partResults.length === 0) {
      return res.status(404).json({
        message: "Part not found",
      });
    }

    const currentQuantity = partResults[0].quantity;

    if (currentQuantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available",
      });
    }

    const insertExitQuery = `
      INSERT INTO stock_exits (part_id, quantity, notes)
      VALUES (?, ?, ?)
    `;

    db.query(insertExitQuery, [part_id, quantity, notes], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to create stock exit",
          error: error.message,
        });
      }

      const updatePartQuery = `
        UPDATE parts
        SET quantity = quantity - ?
        WHERE id = ?
      `;

      db.query(updatePartQuery, [quantity, part_id], (updateError) => {
        if (updateError) {
          return res.status(500).json({
            message: "Stock exit created, but failed to update part quantity",
            error: updateError.message,
          });
        }

        res.status(201).json({
          message: "Stock exit created successfully",
          exitId: result.insertId,
        });
      });
    });
  });
};

module.exports = {
  getAllStockExits,
  createStockExit,
};