const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
} = require("../controllers/supplierController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllSuppliers);
router.post("/", authMiddleware, createSupplier);

module.exports = router;