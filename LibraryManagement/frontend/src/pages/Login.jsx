import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      // Mengarah ke server backend kamu di port 5000
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Menyimpan token keamanan di browser
      localStorage.setItem("token", response.data.token);
      
      // Sukses login, langsung masuk ke dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Koneksi ke server gagal!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📚 LOGIN PETUGAS</h2>
        <p style={styles.subtitle}>Aplikasi Manajemen Perpustakaan</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Alamat Email</label>
            <input 
              type="email" 
              placeholder="admin@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="******" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Masuk</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f9", fontFamily: "sans-serif" },
  card: { backgroundColor: "#fff", padding: "35px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", width: "340px" },
  title: { textAlign: "center", margin: "0 0 5px 0", color: "#1890ff", fontSize: "24px", fontWeight: "bold" },
  subtitle: { textAlign: "center", color: "#888", fontSize: "14px", marginBottom: "25px" },
  errorBox: { backgroundColor: "#fff2f0", border: "1px solid #ffccc7", color: "#ff4d4f", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px", textAlign: "center" },
  inputGroup: { marginBottom: "18px", display: "flex", flexDirection: "column" },
  label: { fontSize: "14px", color: "#333", fontWeight: "600", marginBottom: "5px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #d9d9d9", fontSize: "14px", outline: "none" },
  button: { width: "100%", padding: "12px", backgroundColor: "#1890ff", color: "#fff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }
};

export default Login;