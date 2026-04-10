const express = require("express");
const router = express.Router();

const { getLowStockParts } = require("../controllers/alertController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/low-stock", authMiddleware, getLowStockParts);

module.exports = router;