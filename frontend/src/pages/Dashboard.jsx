import { useEffect, useState } from "react";
import axios from "axios";
import Parts from "./Parts";
import Suppliers from "./Suppliers";
import LowStock from "./LowStock";
import CreatePart from "./CreatePart";
import CreateSupplier from "./CreateSupplier";
import CreateStockEntry from "./CreateStockEntry";
import CreateStockExit from "./CreateStockExit";
import MovementHistory from "./MovementHistory";

function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      let token = null;

      try {
        token = localStorage.getItem("token");
      } catch (error) {
        console.log("localStorage blocked");
      }

      const response = await axios.get(
        "https://auto-shop-inventory-system.onrender.com/api/dashboard/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(response.data);
    } catch (error) {
      try {
        localStorage.removeItem("token");
      } catch (e) {}

      onLogout();
    }
  };

  fetchDashboard();
}, []);

  if (currentView === "parts") {
    return <Parts onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "suppliers") {
    return <Suppliers onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "lowStock") {
    return <LowStock onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "createPart") {
    return <CreatePart onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "createSupplier") {
    return <CreateSupplier onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "createStockEntry") {
    return <CreateStockEntry onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "createStockExit") {
    return <CreateStockExit onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "history") {
    return <MovementHistory onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (message) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{message}</h2>;
  }

  if (!summary) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Auto Shop Dashboard</h1>
          <p style={styles.subtitle}>Inventory overview and quick actions</p>
        </div>

        <button style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Total Parts</p>
          <h2 style={styles.cardValue}>{summary.totalParts}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Total Suppliers</p>
          <h2 style={styles.cardValue}>{summary.totalSuppliers}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Stock Entries</p>
          <h2 style={styles.cardValue}>{summary.totalStockEntries}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Stock Exits</p>
          <h2 style={styles.cardValue}>{summary.totalStockExits}</h2>
        </div>

        <div style={styles.alertCard}>
          <p style={styles.cardLabel}>Low Stock Items</p>
          <h2 style={styles.alertValue}>{summary.lowStockItems}</h2>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>View Data</h2>
        <div style={styles.buttonGrid}>
          <button style={styles.primaryButton} onClick={() => setCurrentView("parts")}>
            View Parts
          </button>

          <button style={styles.primaryButton} onClick={() => setCurrentView("suppliers")}>
            View Suppliers
          </button>

          <button style={styles.warningButton} onClick={() => setCurrentView("lowStock")}>
            View Low Stock
          </button>

          <button style={styles.primaryButton} onClick={() => setCurrentView("history")}>
            Movement History
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.buttonGrid}>
          <button style={styles.successButton} onClick={() => setCurrentView("createPart")}>
            Create Part
          </button>

          <button style={styles.successButton} onClick={() => setCurrentView("createSupplier")}>
            Create Supplier
          </button>

          <button style={styles.successButton} onClick={() => setCurrentView("createStockEntry")}>
            Create Stock Entry
          </button>

          <button style={styles.dangerButton} onClick={() => setCurrentView("createStockExit")}>
            Create Stock Exit
          </button>
        </div>
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
  },
  title: {
    margin: 0,
    fontSize: "32px",
    color: "#1f2937",
  },
  subtitle: {
    margin: "8px 0 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },
  logoutButton: {
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  alertCard: {
    backgroundColor: "#fff4f4",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    border: "1px solid #fecaca",
  },
  cardLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },
  cardValue: {
    margin: "12px 0 0 0",
    fontSize: "34px",
    color: "#111827",
  },
  alertValue: {
    margin: "12px 0 0 0",
    fontSize: "34px",
    color: "#dc2626",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "22px",
    color: "#1f2937",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  successButton: {
    backgroundColor: "#059669",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  warningButton: {
    backgroundColor: "#d97706",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dangerButton: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Dashboard;