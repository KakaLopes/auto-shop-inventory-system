const express = require("express");
const router = express.Router();

const { getLowStockParts } = require("../controllers/alertController");

router.get("/low-stock", getLowStockParts);

module.exports = router;