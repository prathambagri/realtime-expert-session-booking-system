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
      <div className="relative mb-10 overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-700 px-6 py-14 md:px-12 md:py-20 shadow-lg">
        {/* Background Blur */}
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Find Your Perfect Expert
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Book one-on-one sessions with experienced professionals in Design,
            Engineering, Marketing and Finance.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experts..."
              className="flex-1 rounded-lg border border-white/10 bg-white px-5 py-4 text-slate-700 shadow-lg outline-none transition-all duration-300 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-300"
            />

            <button
              type="submit"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 shadow-lg transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* AI Assistant */}
      <AIBookingAssistant />

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-500">
            Categories
          </span>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange({ target: { value: cat } })}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                category === cat
                  ? "bg-indigo-600 text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {(search || category !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPage(1);
              fetchExperts("All", 1, "");
            }}
            className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Expert Grid */}
      {!loading && !error && (
        <>
          {experts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
              <div className="mb-4 text-6xl">🔍</div>

              <h2 className="text-2xl font-bold text-slate-800">
                No Experts Found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another keyword or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setPage(1);
                  fetchExperts("All", 1, "");
                }}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
