import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ buku: 0, pinjam: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [resBuku, resPinjam] = await Promise.all([
          axios.get('http://localhost:5000/api/books', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/loans', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setStats({ buku: resBuku.data.length, pinjam: resPinjam.data.filter(l => l.status === 'Dipinjam').length });
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* NAVBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", background: "#98DED9", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Library Admin</h2>
        <button onClick={() => navigate("/dashboard")} style={{ background: "#2C3E50", color: "#fff", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Dashboard</button>
        <button onClick={() => navigate("/books")} style={{ padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Kelola Buku</button>
        <button onClick={() => navigate("/loans")} style={{ padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Kelola Peminjaman</button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} style={{ marginLeft: "auto", background: "#FF9A8B", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
      </div>

      {/* WELCOME MESSAGE */}
      <div style={{ marginBottom: "30px", padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
        <h1 style={{ margin: 0 }}>Welcome to the Library Dashboard</h1>
        <p>Pantau data buku dan aktivitas peminjaman melalui statistik di bawah ini.</p>
      </div>

      {/* STATISTIK CHART */}
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fff", height: "300px" }}>
        <h3>Statistik Perpustakaan</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ name: 'Total Buku', val: stats.buku }, { name: 'Sedang Dipinjam', val: stats.pinjam }]}>
            <XAxis dataKey="name" /> <YAxis /> <Tooltip /> <Bar dataKey="val" fill="#98DED9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Dashboard;