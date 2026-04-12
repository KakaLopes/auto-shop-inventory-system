import { useEffect, useState } from "react";
import axios from "axios";

function Suppliers({ onBack, onLogout }) {
  const [suppliers, setSuppliers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("https://auto-shop-inventory-system.onrender.com/api/suppliers", {
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
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Suppliers List</h1>
          <p style={styles.subtitle}>Manage and review all registered suppliers</p>
        </div>

        <div style={styles.topButtons}>
          <button style={styles.secondaryButton} onClick={onBack}>
            Back to Dashboard
          </button>

          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.contentCard}>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.tableWrapper}>
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
                <tr key={supplier.id} style={styles.row}>
                  <td style={styles.td}>{supplier.name}</td>
                  <td style={styles.td}>{supplier.phone || "N/A"}</td>
                  <td style={styles.td}>{supplier.email || "N/A"}</td>
                  <td style={styles.td}>{supplier.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {suppliers.length === 0 && !message && (
          <p style={styles.emptyText}>No suppliers found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f6f8fb",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    gap: "20px",
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "30px",
    color: "#1f2937",
  },
  subtitle: {
    margin: "8px 0 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },
  topButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  secondaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  contentCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  message: {
    marginBottom: "16px",
    color: "#dc2626",
    fontWeight: "bold",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    textAlign: "left",
    padding: "14px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827",
    fontSize: "14px",
  },
  row: {
    backgroundColor: "#ffffff",
  },
  emptyText: {
    marginTop: "20px",
    color: "#6b7280",
  },
};

export default Suppliers;