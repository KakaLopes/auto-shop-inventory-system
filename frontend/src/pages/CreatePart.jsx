import { useEffect, useState } from "react";
import axios from "axios";

function CreatePart({ onBack, onLogout }) {
  const [name, setName] = useState("");
  const [partCode, setPartCode] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [supplierId, setSupplierId] = useState("");
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

  const handleCreatePart = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/parts",
        {
          name,
          part_code: partCode,
          category,
          quantity: Number(quantity),
          minimum_stock: Number(minimumStock),
          supplier_id: Number(supplierId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Part created successfully ✅");
      setName("");
      setPartCode("");
      setCategory("");
      setQuantity("");
      setMinimumStock("");
      setSupplierId("");
    } catch (error) {
      setMessage("Failed to create part ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Create Part</h1>
          <p style={styles.subtitle}>Add a new part to the inventory system</p>
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
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.formGrid}>
          <div style={styles.field}>
            <label style={styles.label}>Part Name</label>
            <input
              type="text"
              placeholder="Enter part name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Part Code</label>
            <input
              type="text"
              placeholder="Enter part code"
              value={partCode}
              onChange={(e) => setPartCode(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />
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
            <label style={styles.label}>Minimum Stock</label>
            <input
              type="number"
              placeholder="Enter minimum stock"
              value={minimumStock}
              onChange={(e) => setMinimumStock(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              style={styles.input}
            >
              <option value="">Select supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button style={styles.submitButton} onClick={handleCreatePart}>
          Create Part
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
    color: "#2563eb",
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

export default CreatePart;