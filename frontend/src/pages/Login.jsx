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
      setMessage("Login failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setMessage("");
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div style={styles.container}>
      <h1>Auto Shop Inventory Login</h1>

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

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  input: {
    width: "280px",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
  },
  button: {
    width: "280px",
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;