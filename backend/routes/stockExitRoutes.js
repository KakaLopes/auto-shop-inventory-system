const express = require("express");
const router = express.Router();

const {
  getAllStockExits,
  createStockExit,
} = require("../controllers/stockExitController");

const authMiddleware = require("../middleware/authMiddleware");
router.get("/", authMiddleware, getAllStockExits);
router.post("/", authMiddleware, createStockExit);

module.exports = router;