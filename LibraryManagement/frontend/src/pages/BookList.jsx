import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', year: '', stock: '' });

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/books', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:5000/api/books', formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setFormData({ title: '', author: '', year: '', stock: '' });
      fetchBooks();
    } catch (err) {
      alert("Gagal menyimpan!");
    }
  };

  // FUNGSI HAPUS
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus buku ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBooks();
      } catch (err) {
        alert("Gagal menghapus buku.");
      }
    }
  };

  // FUNGSI EDIT
  const handleEdit = async (b) => {
    const newTitle = prompt("Edit Judul:", b.title);
    const newAuthor = prompt("Edit Penulis:", b.author);
    const newYear = prompt("Edit Tahun:", b.year);
    const newStock = prompt("Edit Stok:", b.stock);

    if (newTitle && newAuthor && newYear && newStock) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/api/books/${b.id}`, 
          { title: newTitle, author: newAuthor, year: newYear, stock: newStock },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchBooks();
      } catch (err) {
        alert("Gagal mengupdate buku.");
      }
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", background: "#98DED9", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Library Admin</h2>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/books")} style={{ background: "#2C3E50", color: "#fff" }}>Kelola Buku</button>
        <button onClick={() => navigate("/loans")}>Kelola Peminjaman</button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} style={{ marginLeft: "auto", background: "#FF9A8B", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
      </div>

      <div style={{ padding: "20px", border: "2px solid #98DED9", borderRadius: "10px", marginBottom: "30px" }}>
        <h3>+ Tambah Koleksi Buku Baru</h3>
        <form onSubmit={handleTambah} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input required placeholder="Judul Buku" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: "8px" }} />
          <input required placeholder="Penulis" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} style={{ padding: "8px" }} />
          <input required placeholder="Tahun" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} style={{ padding: "8px", width: "80px" }} />
          <input required placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ padding: "8px", width: "80px" }} />
          <button type="submit" style={{ background: "#98DED9", border: "none", padding: "8px 20px", borderRadius: "5px", cursor: "pointer" }}>Simpan</button>
        </form>
      </div>

      <table width="100%" border="1" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#98DED9" }}>
            <th>ID</th><th>Judul Buku</th><th>Penulis</th><th>Tahun</th><th>Stok</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id} style={{ textAlign: "center" }}>
              <td>{b.id}</td><td>{b.title}</td><td>{b.author}</td><td>{b.year}</td><td>{b.stock}</td>
              <td style={{ padding: "5px" }}>
                <button onClick={() => handleEdit(b)} style={{ background: "#2C3E50", color: "#fff", border: "none", padding: "5px 10px", marginRight: "5px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(b.id)} style={{ background: "#FF9A8B", border: "none", padding: "5px 10px", cursor: "pointer" }}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookList;