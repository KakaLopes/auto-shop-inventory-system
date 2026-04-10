const db = require("../config/db");

// GET all stock entries
const getAllStockEntries = (req, res) => {
  const query = `
    SELECT 
      stock_entries.id,
      stock_entries.quantity,
      stock_entries.entry_date,
      stock_entries.notes,
      parts.name AS part_name,
      parts.part_code
    FROM stock_entries
    INNER JOIN parts ON stock_entries.part_id = parts.id
    ORDER BY stock_entries.entry_date DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch stock entries",
        error: error.message,
      });
    }

    res.status(200).json(results);
  });
};

// CREATE stock entry and update part quantity
const createStockEntry = (req, res) => {
  const { part_id, quantity, notes } = req.body;

  const insertEntryQuery = `
    INSERT INTO stock_entries (part_id, quantity, notes)
    VALUES (?, ?, ?)
  `;

  db.query(insertEntryQuery, [part_id, quantity, notes], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to create stock entry",
        error: error.message,
      });
    }

    const updatePartQuery = `
      UPDATE parts
      SET quantity = quantity + ?
      WHERE id = ?
    `;

    db.query(updatePartQuery, [quantity, part_id], (updateError) => {
      if (updateError) {
        return res.status(500).json({
          message: "Stock entry created, but failed to update part quantity",
          error: updateError.message,
        });
      }

      res.status(201).json({
        message: "Stock entry created successfully",
        entryId: result.insertId,
      });
    });
  });
};

module.exports = {
  getAllStockEntries,
  createStockEntry,
};