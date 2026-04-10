import { useEffect, useState } from "react";
import axios from "axios";

function LowStock({ onBack, onLogout }) {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/alerts/low-stock",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setItems(response.data);
      } catch (error) {
        setMessage("Failed to load low stock items");
      }
    };

    fetchLowStock();
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

      <h1>Low Stock Items 🚨</h1>

      {message && <p>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Minimum Stock</th>
            <th style={styles.th}>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.part_code}</td>
              <td style={{ ...styles.td, color: "red", fontWeight: "bold" }}>
                {item.quantity}
              </td>
              <td style={styles.td}>{item.minimum_stock}</td>
              <td style={styles.td}>{item.supplier_name || "N/A"}</td>
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
    marginTop: "30px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "12px",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ccc",
    padding: "12px",
  },
};

export default LowStock;