import { useEffect, useState } from "react";
import axios from "axios";
import Parts from "./Parts";
import Suppliers from "./Suppliers";
import LowStock from "./LowStock";

function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");

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

  if (currentView === "parts") {
    return (
      <Parts
        onBack={() => setCurrentView("dashboard")}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "suppliers") {
    return (
      <Suppliers
        onBack={() => setCurrentView("dashboard")}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "lowStock") {
    return (
      <LowStock
        onBack={() => setCurrentView("dashboard")}
        onLogout={onLogout}
      />
    );
  }

  if (message) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{message}</h2>;
  }

  if (!summary) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1>Auto Shop Dashboard</h1>
        <button style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>

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

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setCurrentView("parts")}>
          View Parts
        </button>

        <button style={styles.button} onClick={() => setCurrentView("suppliers")}>
          View Suppliers
        </button>

        <button style={styles.button} onClick={() => setCurrentView("lowStock")}>
          View Low Stock 🚨
        </button>
      </div>
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
    alignItems: "center",
    marginBottom: "30px",
  },
  logoutButton: {
    padding: "10px 20px",
    cursor: "pointer",
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
  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Dashboard;