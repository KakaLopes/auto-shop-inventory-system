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
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button style={styles.button} onClick={onBack}>
          Back to Dashboard
        </button>

        <button style={styles.button} onClick={onLogout}>
          Logout
        </button>
      </div>

      <h1>Create Part</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Part Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Part Code"
          value={partCode}
          onChange={(e) => setPartCode(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Minimum Stock"
          value={minimumStock}
          onChange={(e) => setMinimumStock(e.target.value)}
          style={styles.input}
        />

        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>

        <button style={styles.submitButton} onClick={handleCreatePart}>
          Create Part
        </button>

        {message && <p>{message}</p>}
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
    marginBottom: "20px",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default CreatePart;