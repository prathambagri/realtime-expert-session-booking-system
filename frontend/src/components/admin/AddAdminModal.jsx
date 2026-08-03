import { useState } from "react";
import axios from "axios";

export default function AddAdminModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/admins`,
        formData,
      );
      onCreated(data.admin);
      setFormData({ name: "", email: "", password: "" });
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #E2E8F0",
    fontSize: "14px",
    outline: "none",
    color: "#0F172A",
    background: "#F8FAFC",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "420px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)",
            padding: "20px 24px",
            color: "#fff",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
            Add Admin
          </h2>
        </div>
        <div style={{ padding: "24px" }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#64748B",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Admin name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#64748B",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#64748B",
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1.5px solid #E2E8F0",
                  background: "#fff",
                  color: "#64748B",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: loading ? "#E2E8F0" : "#16A34A",
                  color: loading ? "#94A3B8" : "#fff",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 12px rgba(22,163,74,0.3)",
                }}
              >
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
