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
    if (!name.trim()) {
      setMessage("Supplier name is required ❌");
      return;
    }

    if (!contact.trim()) {
      setMessage("Contact person is required ❌");
      return;
    }

    if (!phone.trim()) {
      setMessage("Phone is required ❌");
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required ❌");
      return;
    }

    if (!address.trim()) {
      setMessage("Address is required ❌");
      return;
    }

    try {
      let token = null;

      try {
        token =
          window.localStorage.getItem("token") ||
          window.sessionStorage.getItem("token");
      } catch (error) {
        console.log("storage blocked");
      }

      await axios.post(
        "https://auto-shop-inventory-system.onrender.com/api/suppliers",
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
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Create Supplier</h1>
          <p style={styles.subtitle}>Add a new supplier to the inventory system</p>
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
            <label style={styles.label}>Supplier Name</label>
            <input
              type="text"
              placeholder="Enter supplier name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contact Person</label>
            <input
              type="text"
              placeholder="Enter contact person"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              placeholder="Enter supplier address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <button style={styles.submitButton} onClick={handleCreateSupplier}>
          Create Supplier
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

export default CreateSupplier;