import { useState, useEffect } from "react";
import API from "../api/axios";
import ExpertCard from "../components/ExpertCard";

const CATEGORIES = ["All", "Design", "Engineering", "Marketing", "Finance"];

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchExperts = async (cat = category, pg = page, s = search) => {
    setLoading(true);
    setError("");
    try {
      const params = { page: pg, limit: 6 };
      if (s.trim()) params.search = s.trim();
      if (cat !== "All") params.category = cat;

      const res = await API.get("/experts", { params });
      setExperts(res.data.experts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load experts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts(category, page, search);
  }, [page, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchExperts(category, 1, search);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSearch("");
    setPage(1);
    fetchExperts(newCategory, 1, "");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchExperts(category, newPage, search);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "24px", color: "#111827" }}>Find an Expert</h2>

      {/* Search and Filter */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{ display: "flex", gap: "8px", flex: 1 }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPage(1);
              fetchExperts("All", 1, "");
            }}
            style={{
              padding: "10px 16px",
              background: "#F3F4F6",
              color: "#374151",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear
          </button>
        </form>

        <select
          value={category}
          onChange={handleCategoryChange}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
            fontSize: "14px",
            background: "#fff",
            minWidth: "140px",
            color: "#374151",
            cursor: "pointer",
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px", color: "#6B7280" }}>
          Loading experts...
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      {/* Expert Grid */}
      {!loading && !error && (
        <>
          {experts.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "60px", color: "#6B7280" }}
            >
              No experts found.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {experts.map((expert) => (
                <ExpertCard key={expert._id} expert={expert} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{ display: "flex", justifyContent: "center", gap: "8px" }}
            >
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                // Prev button style
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                  background: page === 1 ? "#F3F4F6" : "#fff",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  color: "#374151",
                }}
              >
                ← Prev
              </button>

              <span style={{ padding: "8px 16px", color: "#6B7280" }}>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                // Next button style
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                  background: page === totalPages ? "#F3F4F6" : "#fff",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  color: "#374151",
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpertList;
