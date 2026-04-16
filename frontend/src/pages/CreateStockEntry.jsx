import { useEffect, useState } from "react";
import axios from "axios";

function CreateStockEntry({ onBack, onLogout }) {
  const [partId, setPartId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [parts, setParts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        let token = null;

        try {
          token =
            window.localStorage.getItem("token") ||
            window.sessionStorage.getItem("token");
        } catch (error) {
          
        }

        const response = await axios.get(
          "https://auto-shop-inventory-system.onrender.com/api/parts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setParts(response.data);
      } catch (error) {
        setMessage("Failed to load parts ❌");
      }
    };

    fetchParts();
  }, []);

  const handleCreateStockEntry = async () => {
    if (!partId) {
      setMessage("Please select a part ❌");
      return;
    }

    if (quantity === "" || Number(quantity) <= 0) {
      setMessage("Quantity must be greater than 0 ❌");
      return;
    }

    if (!entryDate) {
      setMessage("Entry date is required ❌");
      return;
    }

    if (!notes.trim()) {
      setMessage("Notes are required ❌");
      return;
    }

    try {
      let token = null;

      try {
        token =
          window.localStorage.getItem("token") ||
          window.sessionStorage.getItem("token");
      } catch (error) {
        
      }

      await axios.post(
        "https://auto-shop-inventory-system.onrender.com/api/stock-entries",
        {
          part_id: Number(partId),
          quantity: Number(quantity),
          entry_date: new Date(entryDate).toISOString(),
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Stock entry created successfully ✅");
      setPartId("");
      setQuantity("");
      setEntryDate("");
      setNotes("");
    } catch (error) {
      setMessage("Failed to create stock entry ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Create Stock Entry</h1>
          <p style={styles.subtitle}>Add incoming stock to the inventory</p>
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

      <div style={styles.formCard}>
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("❌") ? "#dc2626" : "#059669",
            }}
          >
            {message}
          </p>
        )}

        <div style={styles.formGrid}>
          <div style={styles.field}>
            <label style={styles.label}>Part</label>
            <select
              value={partId}
              onChange={(e) => setPartId(e.target.value)}
              style={styles.input}
            >
              <option value="">Select part</option>
              {parts.map((part) => (
                <option key={part.id} value={part.id}>
                  {part.name} ({part.part_code})
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Entry Date</label>
            <input
              type="datetime-local"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Notes</label>
            <input
              type="text"
              placeholder="Enter notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <button style={styles.submitButton} onClick={handleCreateStockEntry}>
          Create Stock Entry
        </button>
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
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  message: {
    marginBottom: "18px",
    fontWeight: "bold",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
    marginBottom: "24px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  fieldFull: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gridColumn: "1 / -1",
  },
  label: {
    marginBottom: "8px",
    fontSize: "14px",
    color: "#374151",
    fontWeight: "bold",
  },
  input: {
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
  },
  submitButton: {
    backgroundColor: "#059669",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 22px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CreateStockEntry;