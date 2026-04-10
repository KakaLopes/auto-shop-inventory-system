const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
} = require("../controllers/supplierController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, getAllSuppliers);
router.post("/", authMiddleware, adminMiddleware, createSupplier);

module.exports = router;