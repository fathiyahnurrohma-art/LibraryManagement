import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanList = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/loans', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setLoans(res.data);
    } catch (err) {
      console.error("Gagal memuat:", err);
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:5000/api/loans', 
        { member_id: memberId, book_id: bookId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Berhasil disimpan!");
      setMemberId(''); setBookId('');
      fetchLoans();
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.message || "Cek ID Anggota/Buku"));
    }
  };

  const handleReturn = async (id) => {
    if (window.confirm("Yakin ingin mengembalikan buku ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/api/loans/${id}/return`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Buku berhasil dikembalikan!");
        fetchLoans();
      } catch (err) {
        alert("Gagal memproses pengembalian.");
      }
    }
  };

  useEffect(() => { fetchLoans(); }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* NAVBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", background: "#98DED9", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Library Admin</h2>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/books")}>Kelola Buku</button>
        <button onClick={() => navigate("/loans")} style={{ background: "#2C3E50", color: "#fff" }}>Kelola Peminjaman</button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} style={{ marginLeft: "auto", background: "#FF9A8B", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
      </div>

      {/* FORM */}
      <div style={{ padding: "20px", border: "2px solid #98DED9", borderRadius: "10px", marginBottom: "30px" }}>
        <h3>Catat Transaksi Peminjaman Baru</h3>
        <form onSubmit={handleSimpan} style={{ display: "flex", gap: "10px" }}>
          <input type="text" placeholder="ID Anggota" value={memberId} onChange={(e) => setMemberId(e.target.value)} style={{ padding: "8px", flex: 1 }} required />
          <input type="text" placeholder="ID Buku" value={bookId} onChange={(e) => setBookId(e.target.value)} style={{ padding: "8px", flex: 1 }} required />
          <button type="submit" style={{ background: "#FF9A8B", border: "none", padding: "8px 20px", borderRadius: "5px", cursor: "pointer" }}>Simpan Pinjaman</button>
        </form>
      </div>

      {/* TABEL */}
      <table width="100%" border="1" style={{ borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#FF9A8B" }}>
            <th>ID Tx</th><th>Nama Anggota</th><th>Judul Buku</th><th>Tgl Pinjam</th><th>Status</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loans
            .filter((l) => l.status === 'Dipinjam') 
            .map((l) => (
              <tr key={l.id} style={{ textAlign: "center" }}>
                <td>{l.id}</td>
                <td>{l.member_name}</td>
                <td>{l.book_title}</td>
                <td>{l.loan_date ? l.loan_date.split('T')[0] : "-"}</td>
                <td>{l.status}</td>
                <td>
                  <button onClick={() => handleReturn(l.id)}>Kembalikan</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;