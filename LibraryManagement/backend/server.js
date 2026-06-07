const express = require("express");
const cors = require("cors"); // <-- Tambah ini (Jangan lupa instal dulu: npm i cors)
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors()); // <-- WAJIB ADA biar frontend React gak kena blokir keamanan browser!
app.use(express.json()); // Middleware untuk membaca JSON body

// ================= IMPORT ROUTES =================
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const loanRoutes = require("./routes/loan"); // <-- Tambah rute transaksi peminjaman baru

// ================= USE ROUTES =================
app.use("/api/auth", authRoutes); // <-- Diubah jadi /api/auth biar lebih rapi & standar industri
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes); // <-- Daftarkan rute peminjaman di sini

// ================= TEST SERVER =================
app.get("/", (req, res) => {
  res.send("Backend Perpustakaan Berjalan Ceria! 🚀");
});

// ================= START SERVER =================
// Menambahkan angka 5000 sebagai cadangan (backup) kalau misal PORT di .env lupa terbaca
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`🟢 Server berhasil berjalan di port ${PORT}`);
});