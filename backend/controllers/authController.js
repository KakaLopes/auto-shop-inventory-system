const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("REGISTER BODY:", req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = randomUUID();

    const query = `
      INSERT INTO users (id, full_name, email, password_hash, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [id, name, email, hashedPassword, "admin"], (error) => {
      if (error) {
        console.log("REGISTER DB ERROR:", error);
        return res.status(500).json({
          message: "Failed to register user",
          error: error.message,
        });
      }

      res.status(201).json({
        message: "User registered successfully",
        userId: id,
      });
    });
  } catch (err) {
    console.log("REGISTER SERVER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY:", req.body);

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (error, results) => {
    try {
      if (error) {
        console.log("LOGIN DB ERROR:", error);
        return res.status(500).json({
          message: "Failed to login",
          error: error.message,
        });
      }

      console.log("LOGIN RESULTS:", results);

      if (!results || results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const user = results[0];
      console.log("LOGIN USER:", user);

      if (!password || !user.password_hash) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.log("LOGIN SERVER ERROR:", err);
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};

module.exports = {
  register,
  login,
};