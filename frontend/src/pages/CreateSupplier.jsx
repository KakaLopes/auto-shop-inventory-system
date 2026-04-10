import { useState } from "react";
import axios from "axios";

function CreateSupplier({ onBack, onLogout }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateSupplier = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/suppliers",
        {
          name,
          contact,
          phone,
          email,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Supplier created successfully ✅");

      setName("");
      setContact("");
      setPhone("");
      setEmail("");
      setAddress("");
    } catch (error) {
      setMessage("Failed to create supplier ❌");
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

      <h1>Create Supplier</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />

        <button style={styles.submitButton} onClick={handleCreateSupplier}>
          Create Supplier
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

export default CreateSupplier;