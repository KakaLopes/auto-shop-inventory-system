const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
} = require("../controllers/supplierController");

router.get("/", getAllSuppliers);
router.post("/", createSupplier);

module.exports = router;