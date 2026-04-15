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
import { getStoredToken, clearStoredToken } from "../utils/auth";

function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = getStoredToken();

      if (!token) {
        clearStoredToken();
        onLogout();
        return;
      }

      try {
        setLoading(true);
        setMessage("");

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
        if (error.response?.status === 401) {
          clearStoredToken();
          onLogout();
          return;
        }

        setMessage("Failed to load dashboard data ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [onLogout]);

  if (currentView === "parts") {
    return <Parts onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "suppliers") {
    return <Suppliers onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "lowStock") {
    return <LowStock onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
  }

  if (currentView === "movementHistory") {
    return <MovementHistory onBack={() => setCurrentView("dashboard")} onLogout={onLogout} />;
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

  if (loading) {
    return (
      <div style={styles.statePage}>
        <div style={styles.stateCard}>
          <div style={styles.spinner}></div>
          <h2 style={styles.stateTitle}>Loading dashboard...</h2>
          <p style={styles.stateText}>Please wait while we fetch your inventory summary.</p>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div style={styles.statePage}>
        <div style={styles.stateCard}>
          <h2 style={styles.errorTitle}>Something went wrong</h2>
          <p style={styles.errorText}>{message}</p>
          <button style={styles.retryButton} onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div style={styles.statePage}>
        <div style={styles.stateCard}>
          <h2 style={styles.errorTitle}>No data available</h2>
          <p style={styles.errorText}>Dashboard data could not be displayed.</p>
        </div>
      </div>
    );
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

      <div style={styles.cardContainer}>
        <div
          style={styles.card}
          onClick={() => setCurrentView("parts")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h3 style={styles.cardTitle}>Total Parts</h3>
          <p style={styles.cardValue}>{summary.totalParts}</p>
        </div>

        <div
          style={styles.card}
          onClick={() => setCurrentView("suppliers")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h3 style={styles.cardTitle}>Total Suppliers</h3>
          <p style={styles.cardValue}>{summary.totalSuppliers}</p>
        </div>

        <div
          style={styles.card}
          onClick={() => setCurrentView("movementHistory")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h3 style={styles.cardTitle}>Stock Entries</h3>
          <p style={styles.cardValue}>{summary.totalStockEntries}</p>
        </div>

        <div
          style={styles.card}
          onClick={() => setCurrentView("movementHistory")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h3 style={styles.cardTitle}>Stock Exits</h3>
          <p style={styles.cardValue}>{summary.totalStockExits}</p>
        </div>

        <div
          style={styles.alertCard}
          onClick={() => setCurrentView("lowStock")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h3 style={styles.cardTitle}>Low Stock Items</h3>
          <p style={styles.alertValue}>{summary.lowStockItems}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>View Data</h2>

        <div style={styles.buttonGrid}>
          <button style={styles.blueButton} onClick={() => setCurrentView("parts")}>
            View Parts
          </button>

          <button style={styles.blueButton} onClick={() => setCurrentView("suppliers")}>
            View Suppliers
          </button>

          <button style={styles.orangeButton} onClick={() => setCurrentView("lowStock")}>
            View Low Stock
          </button>

          <button style={styles.blueButton} onClick={() => setCurrentView("movementHistory")}>
            Movement History
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>

        <div style={styles.buttonGrid}>
          <button style={styles.greenButton} onClick={() => setCurrentView("createPart")}>
            Create Part
          </button>

          <button style={styles.greenButton} onClick={() => setCurrentView("createSupplier")}>
            Create Supplier
          </button>

          <button style={styles.greenButton} onClick={() => setCurrentView("createStockEntry")}>
            Create Stock Entry
          </button>

          <button style={styles.redButton} onClick={() => setCurrentView("createStockExit")}>
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
    backgroundColor: "#f4f6f8",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  statePage: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  stateCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px 32px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
  },
  spinner: {
    width: "50px",
    height: "50px",
    margin: "0 auto 20px auto",
    border: "5px solid #dbeafe",
    borderTop: "5px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  stateTitle: {
    margin: "0 0 10px 0",
    fontSize: "28px",
    color: "#1f2937",
  },
  stateText: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },
  errorTitle: {
    margin: "0 0 12px 0",
    fontSize: "28px",
    color: "#dc2626",
  },
  errorText: {
    margin: "0 0 20px 0",
    color: "#6b7280",
    fontSize: "15px",
  },
  retryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 22px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  header: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    gap: "20px",
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    lineHeight: "1",
    color: "#1f2937",
  },
  subtitle: {
    margin: "10px 0 0 0",
    color: "#6b7280",
    fontSize: "16px",
  },
  logoutButton: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "16px",
    padding: "16px 28px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    minWidth: "140px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  alertCard: {
    backgroundColor: "#fff7f7",
    border: "1px solid #f2caca",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
    fontWeight: "normal",
  },
  cardValue: {
    margin: "24px 0 0 0",
    fontSize: "64px",
    color: "#111827",
    fontWeight: "500",
  },
  alertValue: {
    margin: "24px 0 0 0",
    fontSize: "64px",
    color: "#cf3b2f",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    marginBottom: "30px",
  },
  sectionTitle: {
    margin: "0 0 24px 0",
    fontSize: "28px",
    textAlign: "center",
    color: "#1f2937",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  blueButton: {
    backgroundColor: "#4365dd",
    color: "#ffffff",
    border: "none",
    borderRadius: "18px",
    padding: "22px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  orangeButton: {
    backgroundColor: "#cf7f2e",
    color: "#ffffff",
    border: "none",
    borderRadius: "18px",
    padding: "22px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  greenButton: {
    backgroundColor: "#4b9b6b",
    color: "#ffffff",
    border: "none",
    borderRadius: "18px",
    padding: "22px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  redButton: {
    backgroundColor: "#cf3b2f",
    color: "#ffffff",
    border: "none",
    borderRadius: "18px",
    padding: "22px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Dashboard;