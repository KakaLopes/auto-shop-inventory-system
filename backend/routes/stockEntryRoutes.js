const express = require("express");
const router = express.Router();

const {
  getAllStockEntries,
  createStockEntry,
} = require("../controllers/stockEntryController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllStockEntries);
router.post("/", authMiddleware, createStockEntry);

module.exports = router;