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
          "https://auto-shop-inventory-system.onrender.com/api/alerts/low-stock",
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
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Low Stock Items</h1>
          <p style={styles.subtitle}>
            Review parts that need attention and replenishment
          </p>
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

      <div style={styles.alertBanner}>
        <h2 style={styles.alertTitle}>Attention Required 🚨</h2>
        <p style={styles.alertText}>
          These items are at or below the minimum stock level.
        </p>
      </div>

      <div style={styles.contentCard}>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Minimum Stock</th>
                <th style={styles.th}>Supplier</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={styles.lowStockRow}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.part_code}</td>
                  <td style={{ ...styles.td, color: "#b91c1c", fontWeight: "bold" }}>
                    {item.quantity}
                  </td>
                  <td style={styles.td}>{item.minimum_stock}</td>
                  <td style={styles.td}>{item.supplier_name || "N/A"}</td>
                  <td style={styles.td}>
                    <span style={styles.lowBadge}>Low Stock</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length === 0 && !message && (
          <p style={styles.emptyText}>No low stock items found.</p>
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
    marginBottom: "24px",
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
  alertBanner: {
    backgroundColor: "#fff1f2",
    border: "1px solid #fecdd3",
    borderRadius: "16px",
    padding: "20px 24px",
    marginBottom: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  alertTitle: {
    margin: 0,
    color: "#b91c1c",
    fontSize: "22px",
  },
  alertText: {
    margin: "8px 0 0 0",
    color: "#7f1d1d",
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
    backgroundColor: "#fef2f2",
    color: "#7f1d1d",
    fontSize: "14px",
    borderBottom: "1px solid #fecaca",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827",
    fontSize: "14px",
  },
  lowStockRow: {
    backgroundColor: "#fff7f7",
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

export default LowStock;