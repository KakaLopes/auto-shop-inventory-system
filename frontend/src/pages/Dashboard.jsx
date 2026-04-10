import { useEffect, useState } from "react";
import axios from "axios";
import Parts from "./Parts";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [showParts, setShowParts] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummary(response.data);
      } catch (error) {
        setMessage("Failed to load dashboard data");
      }
    };

    fetchDashboard();
  }, []);

  if (showParts) {
    return <Parts />;
  }

  if (message) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{message}</h2>;
  }

  if (!summary) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Auto Shop Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Parts</h3>
          <p>{summary.totalParts}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Suppliers</h3>
          <p>{summary.totalSuppliers}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Stock Entries</h3>
          <p>{summary.totalStockEntries}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Stock Exits</h3>
          <p>{summary.totalStockExits}</p>
        </div>

        <div style={styles.card}>
          <h3>Low Stock Items</h3>
          <p>{summary.lowStockItems}</p>
        </div>
      </div>

      <button style={styles.button} onClick={() => setShowParts(true)}>
        View Parts
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "220px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "30px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Dashboard;