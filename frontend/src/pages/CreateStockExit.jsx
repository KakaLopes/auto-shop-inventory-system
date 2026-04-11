import { useEffect, useState } from "react";
import axios from "axios";

function CreateStockExit({ onBack, onLogout }) {
  const [partId, setPartId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
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

  const handleCreateStockExit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/stock-exits",
        {
          part_id: Number(partId),
          quantity: Number(quantity),
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Stock exit created successfully ✅");
      setPartId("");
      setQuantity("");
      setNotes("");
    } catch (error) {
      setMessage("Failed to create stock exit ❌");
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

      <h1>Create Stock Exit</h1>

      <div style={styles.form}>
        <select
          value={partId}
          onChange={(e) => setPartId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Part</option>
          {parts.map((part) => (
            <option key={part.id} value={part.id}>
              {part.name} ({part.part_code})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.input}
        />

        <button style={styles.submitButton} onClick={handleCreateStockExit}>
          Create Stock Exit
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

export default CreateStockExit;