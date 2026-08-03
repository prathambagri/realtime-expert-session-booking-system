import { useState, useEffect } from "react";
import API from "../api/axios";
import ExpertCard from "../components/ExpertCard";
import SkeletonCard from "../components/SkeletonCard";
import AIBookingAssistant from "../components/AIBookingAssistant";

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
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearch("");
    setPage(1);
    fetchExperts(cat, 1, "");
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
          position: "relative",
          textAlign: "center",
          padding: "52px 20px 52px",
          marginBottom: "32px",
          overflow: "hidden",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
        }}
      >
        {/* Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "999px",
            padding: "6px 16px",
            fontSize: "12px",
            color: "#BBF7D0",
            fontWeight: "600",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "#4ADE80",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 8px #4ADE80",
            }}
          />
          Trusted by professionals worldwide
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#FFFFFF",
            lineHeight: "1.08",
            letterSpacing: "-2px",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          Find Your
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #4ADE80, #86EFAC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Perfect Expert
          </span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "16px",
            maxWidth: "420px",
            margin: "0 auto 40px",
            lineHeight: "1.7",
            position: "relative",
          }}
        >
          1-on-1 sessions with vetted professionals in Design, Engineering,
          Marketing & Finance
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "8px",
            maxWidth: "520px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94A3B8",
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by expert name..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 44px",
                background: "#fff",
                border: "2px solid transparent",
                borderRadius: "10px",
                color: "#0F172A",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "14px 24px",
              background: "#fff",
              color: "#16A34A",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* AI Assistant */}
      <AIBookingAssistant />

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "28px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "500" }}>
          Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: "7px 18px",
              borderRadius: "999px",
              border: "1.5px solid",
              borderColor: category === cat ? "#16A34A" : "#E2E8F0",
              background: category === cat ? "#DCFCE7" : "#fff",
              color: category === cat ? "#16A34A" : "#64748B",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {cat}
          </button>
        ))}
        {(search || category !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPage(1);
              fetchExperts("All", 1, "");
            }}
            style={{
              padding: "7px 16px",
              borderRadius: "999px",
              border: "1.5px solid #FCA5A5",
              background: "#FEF2F2",
              color: "#DC2626",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
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
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {experts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px",
                border: "2px dashed #E2E8F0",
                borderRadius: "16px",
                background: "#fff",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                No experts found.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setPage(1);
                  fetchExperts("All", 1, "");
                }}
                style={{
                  padding: "10px 24px",
                  background: "#16A34A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "40px",
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
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid #E2E8F0",
                  background: "#fff",
                  color: page === 1 ? "#CBD5E1" : "#64748B",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ← Prev
              </button>
              <span
                style={{
                  padding: "8px 16px",
                  background: "#16A34A",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {page} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid #E2E8F0",
                  background: "#fff",
                  color: page === totalPages ? "#CBD5E1" : "#64748B",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  fontSize: "14px",
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
