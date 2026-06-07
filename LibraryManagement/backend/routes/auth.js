const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: result[0].id,
        email: result[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  });
});

// PROFILE (INI YANG BARU DITAMBAH)
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Ini data user login",
    user: req.user,
  });
});

module.exports = router;