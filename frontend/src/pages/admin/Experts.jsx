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
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [...new Set(experts.map((e) => e.category))];

  useEffect(() => {
    fetchExperts();
  }, [page, search, category, experience, status]);

  const fetchExperts = async () => {
    try {
      setLoading(true);

      const data = await getAllExperts({
        page,
        search,
        category,
        experience,
        status,
      });

      setExperts(data.experts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch experts:", error);
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

      alert(
        selectedExpert
          ? "Expert updated successfully!"
          : "Expert added successfully!",
      );
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  };

  const handleDeleteExpert = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expert?",
    );

    if (!confirmed) return;

    try {
      await deleteExpert(id);

      await fetchExperts();

      alert("Expert deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete expert.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg font-medium text-slate-500">Loading experts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Experts</h1>

            <p className="mt-2 text-white/80">
              Manage experts, edit profiles and add new specialists.
            </p>

            <div className="mt-6 inline-flex rounded-lg bg-white/15 px-5 py-3 backdrop-blur-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/70">
                  Total Experts
                </p>

                <p className="text-3xl font-bold">{experts.length}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedExpert(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-white px-6 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-px hover:shadow-lg"
          >
            + Add Expert
          </button>
        </div>
      </div>

      {/* Filters */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input
            type="text"
            placeholder="Search expert..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Experience</option>
            <option value="1">1+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Status</option>
            <option value="Available">Available</option>
            <option value="Fully Booked">Fully Booked</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setExperience("");
              setStatus("");
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-semibold transition hover:bg-slate-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-xl border border-slate-200 px-5 py-2 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="rounded-xl bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">
          Page {page} of {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-xl border border-slate-200 px-5 py-2 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Experts Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
              <th className="p-5">Expert</th>
              <th className="p-5">Category</th>
              <th className="p-5">Experience</th>
              <th className="p-5">Rating</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {experts.map((expert) => (
              <tr
                key={expert._id}
                className="border-t border-slate-100 transition hover:bg-indigo-50/40"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 font-bold text-white">
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {expert.name}
                      </p>

                      <p className="text-sm text-slate-500">Expert Profile</p>
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {expert.category}
                  </span>
                </td>

                <td className="p-5 font-medium text-slate-700">
                  {expert.experience} yrs
                </td>

                <td className="p-5">
                  <span className="font-semibold text-amber-500">
                    ⭐ {expert.rating}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedExpert(expert);
                        setShowForm(true);
                      }}
                      className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteExpert(expert._id)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
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

      {/* Expert Modal */}
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
