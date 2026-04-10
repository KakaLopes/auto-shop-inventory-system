const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(query, [name, email, hashedPassword], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to register user",
          error: error.message,
        });
      }

      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
};