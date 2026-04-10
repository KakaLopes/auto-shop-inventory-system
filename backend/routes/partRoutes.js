const express = require("express");
const router = express.Router();

const {
  getAllParts,
  createPart,
} = require("../controllers/partController");

router.get("/", getAllParts);
router.post("/", createPart);

module.exports = router;