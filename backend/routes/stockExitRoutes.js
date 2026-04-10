const express = require("express");
const router = express.Router();

const {
  getAllStockExits,
  createStockExit,
} = require("../controllers/stockExitController");

router.get("/", getAllStockExits);
router.post("/", createStockExit);

module.exports = router;