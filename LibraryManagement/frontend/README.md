# Library Management System

Aplikasi web untuk pengelolaan perpustakaan yang mencakup fitur autentikasi, CRUD buku, dan dashboard statistik.

## Fitur Utama
- **Autentikasi JWT**: Login aman untuk admin.
- **CRUD Buku**: Tambah, Edit, dan Hapus koleksi buku.
- **Manajemen Peminjaman**: Pelacakan aktivitas peminjaman.
- **Dashboard**: Visualisasi statistik perpustakaan.

## Teknologi yang Digunakan
- **Frontend**: React.js, Vite, Axios, Chart.js.
- **Backend**: Node.js, Express, MySQL.

## Cara Instalasi
1. Clone repository ini.
2. **Backend**: Masuk ke folder `backend`, buat file `.env` untuk konfigurasi database, jalankan `npm install` lalu `node server.js`.
3. **Frontend**: Masuk ke folder `frontend`, jalankan `npm install` lalu `npm run dev`.
4. **Database**: Import `schema.sql` ke MySQL Anda.