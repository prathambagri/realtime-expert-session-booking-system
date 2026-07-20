import { useState, useEffect } from "react";
import API from "../api/axios";
import ExpertCard from "../components/ExpertCard";
import SkeletonCard from "../components/SkeletonCard";

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
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          borderRadius: "16px",
          padding: "32px 20px",
          marginBottom: "24px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            marginBottom: "12px",
            letterSpacing: "-0.5px",
          }}
        >
          Find Your Perfect Expert
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.85, marginBottom: "32px" }}>
          Book 1-on-1 sessions with top professionals in Design, Engineering,
          Marketing & Finance
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "8px",
            maxWidth: "600px",
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by expert name..."
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "12px",
              border: "none",
              fontSize: "15px",
              outline: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 28px",
              background: "#fff",
              color: "#4F46E5",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "14px", color: "#6B7280", fontWeight: "500" }}>
          Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange({ target: { value: cat } })}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1.5px solid",
              borderColor: category === cat ? "#4F46E5" : "#E5E7EB",
              background: category === cat ? "#4F46E5" : "#fff",
              color: category === cat ? "#fff" : "#374151",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
        {(search || category !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPage(1);
              fetchExperts("All", 1, "");
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1.5px solid #FCA5A5",
              background: "#FEE2E2",
              color: "#991B1B",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "16px",
            borderRadius: "12px",
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
              style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
              No experts found.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
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
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1.5px solid #E5E7EB",
                  background: page === 1 ? "#F9FAFB" : "#fff",
                  color: page === 1 ? "#9CA3AF" : "#374151",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  fontWeight: "500",
                }}
              >
                ← Prev
              </button>
              <span
                style={{
                  padding: "10px 20px",
                  background: "#4F46E5",
                  color: "#fff",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                {page} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1.5px solid #E5E7EB",
                  background: page === totalPages ? "#F9FAFB" : "#fff",
                  color: page === totalPages ? "#9CA3AF" : "#374151",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  fontWeight: "500",
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
