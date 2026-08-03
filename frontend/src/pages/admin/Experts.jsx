import { useEffect, useState } from "react";
import {
  getAllExperts,
  createExpert,
  updateExpert,
  deleteExpert,
} from "../../services/adminApi";
import ExpertModal from "../../components/admin/ExpertModal";

export default function Experts() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [...new Set(experts.map((e) => e.category))];

  useEffect(() => {
    fetchExperts();
  }, [page, search, category]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const data = await getAllExperts({ page, search, category });
      setExperts(data.experts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExpert = async (data) => {
    try {
      if (selectedExpert) {
        await updateExpert(selectedExpert._id, data);
      } else {
        await createExpert(data);
      }
      await fetchExperts();
      setShowForm(false);
      setSelectedExpert(null);
      alert(selectedExpert ? "Expert updated!" : "Expert added!");
    } catch (err) {
      alert("Operation failed.");
    }
  };

  const handleDeleteExpert = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expert?")) return;
    try {
      await deleteExpert(id);
      await fetchExperts();
      alert("Expert deleted!");
    } catch (err) {
      alert("Failed to delete expert.");
    }
  };

  const inputStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #E2E8F0",
    fontSize: "13px",
    outline: "none",
    background: "#fff",
    color: "#0F172A",
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px",
          color: "#64748B",
        }}
      >
        Loading experts...
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
          borderRadius: "16px",
          padding: "28px 32px",
          marginBottom: "24px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div style={{ position: "relative" }}>
          <h1
            style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "800" }}
          >
            Experts
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.7)",
              fontSize: "13px",
            }}
          >
            Manage expert profiles and add new specialists.
          </p>
          <div
            style={{
              marginTop: "16px",
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            <p
              style={{
                margin: "0 0 2px",
                fontSize: "10px",
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Total Experts
            </p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}>
              {experts.length}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedExpert(null);
            setShowForm(true);
          }}
          style={{
            background: "#fff",
            color: "#15803D",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "700",
            fontSize: "14px",
            cursor: "pointer",
            position: "relative",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          + Add Expert
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          border: "1.5px solid #E2E8F0",
          marginBottom: "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search expert..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ ...inputStyle, flex: 1, minWidth: "160px" }}
          onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          style={{ ...inputStyle, minWidth: "140px" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setPage(1);
          }}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1.5px solid #E2E8F0",
            background: "#F8FAFC",
            color: "#64748B",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1.5px solid #E2E8F0",
          overflow: "hidden",
          marginBottom: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              {["Expert", "Category", "Experience", "Rating", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: h === "Actions" ? "center" : "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {experts.map((expert, i) => (
              <tr
                key={expert._id}
                style={{
                  borderTop: i > 0 ? "1px solid #F1F5F9" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F0FDF4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #16A34A, #22C55E)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0 0 2px",
                          fontWeight: "600",
                          color: "#0F172A",
                          fontSize: "14px",
                        }}
                      >
                        {expert.name}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          color: "#94A3B8",
                        }}
                      >
                        Expert Profile
                      </p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      background: "#DCFCE7",
                      color: "#15803D",
                      border: "1px solid #BBF7D0",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {expert.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {expert.experience} yrs
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#A16207",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    ⭐ {expert.rating}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedExpert(expert);
                        setShowForm(true);
                      }}
                      style={{
                        padding: "6px 14px",
                        background: "#FEF9C3",
                        color: "#A16207",
                        border: "1px solid #FDE047",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpert(expert._id)}
                      style={{
                        padding: "6px 14px",
                        background: "#FEE2E2",
                        color: "#DC2626",
                        border: "1px solid #FCA5A5",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1.5px solid #E2E8F0",
              background: "#fff",
              color: page === 1 ? "#CBD5E1" : "#64748B",
              cursor: page === 1 ? "not-allowed" : "pointer",
              fontSize: "13px",
            }}
          >
            ← Previous
          </button>
          <span
            style={{
              padding: "8px 16px",
              background: "#DCFCE7",
              border: "1px solid #BBF7D0",
              borderRadius: "8px",
              color: "#15803D",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1.5px solid #E2E8F0",
              background: "#fff",
              color: page === totalPages ? "#CBD5E1" : "#64748B",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              fontSize: "13px",
            }}
          >
            Next →
          </button>
        </div>
      )}

      <ExpertModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedExpert(null);
        }}
        onSave={handleSaveExpert}
        initialData={selectedExpert}
        title={selectedExpert ? "Edit Expert" : "Add Expert"}
      />
    </div>
  );
}
