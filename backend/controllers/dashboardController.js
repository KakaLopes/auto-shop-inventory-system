const db = require("../config/db");

const getDashboardSummary = (req, res) => {
  const queries = {
    totalParts: "SELECT COUNT(*) AS totalParts FROM parts",
    totalSuppliers: "SELECT COUNT(*) AS totalSuppliers FROM suppliers",
    totalStockEntries: "SELECT COUNT(*) AS totalStockEntries FROM stock_entries",
    totalStockExits: "SELECT COUNT(*) AS totalStockExits FROM stock_exits",
    lowStockItems: `
      SELECT COUNT(*) AS lowStockItems
      FROM parts
      WHERE quantity <= minimum_stock
    `,
  };

  db.query(queries.totalParts, (error1, result1) => {
    if (error1) {
      return res.status(500).json({ message: "Failed to fetch total parts", error: error1.message });
    }

    db.query(queries.totalSuppliers, (error2, result2) => {
      if (error2) {
        return res.status(500).json({ message: "Failed to fetch total suppliers", error: error2.message });
      }

      db.query(queries.totalStockEntries, (error3, result3) => {
        if (error3) {
          return res.status(500).json({ message: "Failed to fetch total stock entries", error: error3.message });
        }

        db.query(queries.totalStockExits, (error4, result4) => {
          if (error4) {
            return res.status(500).json({ message: "Failed to fetch total stock exits", error: error4.message });
          }

          db.query(queries.lowStockItems, (error5, result5) => {
            if (error5) {
              return res.status(500).json({ message: "Failed to fetch low stock items", error: error5.message });
            }

            res.status(200).json({
              totalParts: result1[0].totalParts,
              totalSuppliers: result2[0].totalSuppliers,
              totalStockEntries: result3[0].totalStockEntries,
              totalStockExits: result4[0].totalStockExits,
              lowStockItems: result5[0].lowStockItems,
            });
          });
        });
      });
    });
  });
};

module.exports = {
  getDashboardSummary,
};