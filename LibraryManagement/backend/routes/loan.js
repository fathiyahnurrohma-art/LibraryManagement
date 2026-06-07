const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 1. AMBIL DATA (Join sudah benar, pastikan nama kolom di DB sesuai)
router.get("/", (req, res) => {
  const query = `
    SELECT loans.*, books.title AS book_title, members.name AS member_name
    FROM loans 
    LEFT JOIN books ON loans.book_id = books.id
    LEFT JOIN members ON loans.member_id = members.id
    ORDER BY loans.id DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal ambil data" });
    res.json(results);
  });
});

// 2. SIMPAN DATA (Ditambahkan log agar tahu jika data tidak terkirim)
router.post("/", (req, res) => {
  const { member_id, book_id } = req.body;

  // Cek apakah data yang diterima kosong
  if (!member_id || !book_id) {
    return res.status(400).json({ message: "ID Anggota dan Buku tidak terkirim dari Frontend!" });
  }

  const loan_date = new Date().toISOString().slice(0, 10);
  const status = "Dipinjam";

  const query = "INSERT INTO loans (member_id, book_id, loan_date, status) VALUES (?, ?, ?, ?)";
  
  db.query(query, [member_id, book_id, loan_date, status], (err) => {
    if (err) return res.status(500).json({ message: "Database Error: " + err.message });
    
    // Kurangi stok
    db.query("UPDATE books SET stock = stock - 1 WHERE id = ?", [book_id]);
    res.status(201).json({ message: "Berhasil!" });
  });
});

// 3. PENGEMBALIAN
router.put("/:id/return", (req, res) => {
  const loanId = req.params.id;
  const return_date = new Date().toISOString().slice(0, 10);

  db.query("SELECT book_id FROM loans WHERE id = ?", [loanId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });

    const bookId = results[0].book_id;
    db.query("UPDATE loans SET return_date = ?, status = 'Selesai' WHERE id = ?", [return_date, loanId], () => {
      db.query("UPDATE books SET stock = stock + 1 WHERE id = ?", [bookId]);
      res.json({ message: "Berhasil dikembalikan!" });
    });
  });
});

module.exports = router;