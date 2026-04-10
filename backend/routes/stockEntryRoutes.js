const express = require("express");
const router = express.Router();

const {
  getAllStockEntries,
  createStockEntry,
} = require("../controllers/stockEntryController");

router.get("/", getAllStockEntries);
router.post("/", createStockEntry);

module.exports = router;