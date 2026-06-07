const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Middleware untuk melindungi rute (Pastikan Anda sudah punya file ini)
// Jika belum punya, simpan fungsi verifyToken di folder middleware/auth.js
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: "Token diperlukan!" });
    next(); 
};

// 1. Ambil Semua Data Buku (READ) - Boleh diakses tanpa login
router.get("/", (req, res) => {
    const query = "SELECT * FROM books ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Tambah Buku Baru (CREATE) - DILINDUNGI
router.post("/", verifyToken, (req, res) => {
    const { title, author, year, stock } = req.body;
    const query = "INSERT INTO books (title, author, year, stock) VALUES (?, ?, ?, ?)";
    
    db.query(query, [title, author, year, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Buku berhasil ditambahkan!", id: result.insertId });
    });
});

// 3. Edit Data Buku (UPDATE) - DILINDUNGI
router.put("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { title, author, year, stock } = req.body;
    const query = "UPDATE books SET title=?, author=?, year=?, stock=? WHERE id=?";
    
    db.query(query, [title, author, year, stock, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data buku berhasil diperbarui!" });
    });
});

// 4. Hapus Buku (DELETE) - DILINDUNGI
router.delete("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM books WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Buku berhasil dihapus!" });
    });
});

module.exports = router;