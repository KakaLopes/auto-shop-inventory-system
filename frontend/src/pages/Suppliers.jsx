import { useEffect, useState } from "react";
import axios from "axios";

function Suppliers({ onBack, onLogout }) {
  const [suppliers, setSuppliers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/suppliers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuppliers(response.data);
      } catch (error) {
        setMessage("Failed to load suppliers");
      }
    };

    fetchSuppliers();
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

      <h1>Suppliers List</h1>

      {message && <p>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Address</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td style={styles.td}>{supplier.name}</td>
              <td style={styles.td}>{supplier.phone}</td>
              <td style={styles.td}>{supplier.email}</td>
              <td style={styles.td}>{supplier.address}</td>
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

export default Suppliers;