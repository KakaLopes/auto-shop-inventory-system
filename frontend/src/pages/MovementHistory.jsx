import { useEffect, useState } from "react";
import axios from "axios";

function MovementHistory({ onBack, onLogout }) {
  const [entries, setEntries] = useState([]);
  const [exits, setExits] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [entriesRes, exitsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/stock-entries", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/stock-exits", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setEntries(entriesRes.data);
        setExits(exitsRes.data);
      } catch (error) {
        setMessage("Failed to load movement history");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button style={styles.button} onClick={onBack}>
          Back to Dashboard
        </button>

        <button style={styles.button} onClick={onLogout}>
          Logout
        </button>
      </div>

      <h1>Stock Movement History 📊</h1>

      {message && <p>{message}</p>}

      {/* ENTRIES */}
      <h2>Stock Entries 📥</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Part</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Notes</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.part_name}</td>
              <td style={{ ...styles.td, color: "green" }}>+{item.quantity}</td>
              <td style={styles.td}>{item.notes}</td>
              <td style={styles.td}>
                {new Date(item.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EXITS */}
      <h2 style={{ marginTop: "40px" }}>Stock Exits 📤</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Part</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Notes</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {exits.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.part_name}</td>
              <td style={{ ...styles.td, color: "red" }}>-{item.quantity}</td>
              <td style={styles.td}>{item.notes}</td>
              <td style={styles.td}>
                {new Date(item.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
  },
};

export default MovementHistory;