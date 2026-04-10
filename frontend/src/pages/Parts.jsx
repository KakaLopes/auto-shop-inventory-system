import { useEffect, useState } from "react";
import axios from "axios";

function Parts() {
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

  return (
    <div style={styles.container}>
      <h1>Parts List</h1>

      {message && <p>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Minimum Stock</th>
            <th style={styles.th}>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td style={styles.td}>{part.name}</td>
              <td style={styles.td}>{part.part_code}</td>
              <td style={styles.td}>{part.category}</td>
              <td style={styles.td}>{part.quantity}</td>
              <td style={styles.td}>{part.minimum_stock}</td>
              <td style={styles.td}>{part.supplier_name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "30px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "12px",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ccc",
    padding: "12px",
  },
};

export default Parts;