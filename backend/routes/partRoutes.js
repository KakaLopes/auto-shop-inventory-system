const express = require("express");
const router = express.Router();

const {
  getAllParts,
  createPart,
} = require("../controllers/partController");

const authMiddleware = require("../middleware/authMiddleware");

// PROTECTED ROUTES
router.get("/", authMiddleware, getAllParts);
router.post("/", authMiddleware, createPart);

module.exports = router;