import { useEffect, useState } from "react";
import axios from "axios";

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onUpdated,
  apiUrl,
}) {
  const [form, setForm] = useState({ name: "", status: "Active" });

  useEffect(() => {
    if (user)
      setForm({ name: user.name || "", status: user.status || "Active" });
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      const url = apiUrl || `${import.meta.env.VITE_API_URL}/api/users`;
      const { data } = await axios.patch(`${url}/${user._id}`, form);
      if (data.success) {
        onUpdated(data.user || data.admin);
        onClose();
      }
    } catch (err) {
      alert("Failed to update user");
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
            Edit User
          </h2>
        </div>
        <div style={{ padding: "24px" }}>
          <div
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
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
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
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "24px",
            }}
          >
            <button
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
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#16A34A",
                color: "#fff",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
