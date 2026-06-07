# Sistem Informasi Perpustakaan (Uji Teknis Fullstack)

Aplikasi web sederhana untuk mengelola peminjaman buku menggunakan Node.js (Express), MySQL, dan React.

## 🗄️ Database & Normalisasi
Database ini menggunakan MySQL dan telah dinormalisasi hingga **3NF (Third Normal Form)** untuk memastikan tidak ada redundansi data.

### Relasi Tabel:
- **users**: Data petugas (Email & Password terenkripsi).
- **books**: Data master buku (Judul, Penulis, Stok).
- **loans**: Tabel transaksi yang menghubungkan `book_id` dan `member_id`.

## 🚀 Cara Menjalankan
1. Import file `schema.sql` ke phpMyAdmin Anda.
2. Jalankan Backend: `cd backend` lalu `node server.js`.
3. Jalankan Frontend: `cd frontend` lalu `npm run dev`.

## 🔑 Akun Login Pengujian
- **Email:** admin@gmail.com
- **Password:** admin123