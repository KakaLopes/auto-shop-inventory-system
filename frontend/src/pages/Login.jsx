import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setMessage("Login successful ✅");
      setIsLoggedIn(true);
    } catch (error) {
      setMessage("Invalid credentials ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Auto Shop</h1>
        <p style={styles.subtitle}>Inventory Management System</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f6f8fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#1f2937",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#6b7280",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    marginTop: "12px",
  },
};

export default Login;