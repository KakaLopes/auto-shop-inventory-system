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
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Movement History</h1>
          <p style={styles.subtitle}>
            Review all stock entries and exits in one place
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

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.sectionCard}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Stock Entries 📥</h2>
          <span style={styles.entryCount}>{entries.length} records</span>
        </div>

        <div style={styles.tableWrapper}>
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
                <tr key={item.id} style={styles.row}>
                  <td style={styles.td}>{item.part_name}</td>
                  <td style={styles.td}>
                    <span style={styles.entryBadge}>+{item.quantity}</span>
                  </td>
                  <td style={styles.td}>{item.notes || "N/A"}</td>
                  <td style={styles.td}>
                    {new Date(item.entry_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {entries.length === 0 && <p style={styles.emptyText}>No stock entries found.</p>}
      </div>

      <div style={styles.sectionCard}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Stock Exits 📤</h2>
          <span style={styles.exitCount}>{exits.length} records</span>
        </div>

        <div style={styles.tableWrapper}>
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
                <tr key={item.id} style={styles.row}>
                  <td style={styles.td}>{item.part_name}</td>
                  <td style={styles.td}>
                    <span style={styles.exitBadge}>-{item.quantity}</span>
                  </td>
                  <td style={styles.td}>{item.notes || "N/A"}</td>
                  <td style={styles.td}>
                    {new Date(item.exit_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {exits.length === 0 && <p style={styles.emptyText}>No stock exits found.</p>}
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
  message: {
    marginBottom: "16px",
    color: "#dc2626",
    fontWeight: "bold",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
    gap: "10px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#1f2937",
  },
  entryCount: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  exitCount: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
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
  entryBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  exitBadge: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: "18px",
    color: "#6b7280",
  },
};

export default MovementHistory;