import { useEffect, useState } from "react";
import axios from "axios";

function Parts({ onBack, onLogout }) {
  const [parts, setParts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/parts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setParts(response.data);
      } catch (error) {
        setMessage("Failed to load parts");
      }
    };

    fetchParts();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Parts List</h1>
          <p style={styles.subtitle}>Manage and review all registered parts</p>
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
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Minimum Stock</th>
                <th style={styles.th}>Supplier</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => {
                const isLowStock = Number(part.quantity) <= Number(part.minimum_stock);

                return (
                  <tr key={part.id} style={isLowStock ? styles.lowStockRow : styles.row}>
                    <td style={styles.td}>{part.name}</td>
                    <td style={styles.td}>{part.part_code}</td>
                    <td style={styles.td}>{part.category}</td>
                    <td style={styles.td}>{part.quantity}</td>
                    <td style={styles.td}>{part.minimum_stock}</td>
                    <td style={styles.td}>{part.supplier_name || "N/A"}</td>
                    <td style={styles.td}>
                      <span style={isLowStock ? styles.lowBadge : styles.okBadge}>
                        {isLowStock ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {parts.length === 0 && !message && (
          <p style={styles.emptyText}>No parts found.</p>
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
  lowStockRow: {
    backgroundColor: "#fff7f7",
  },
  okBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  lowBadge: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: "20px",
    color: "#6b7280",
  },
};

export default Parts;