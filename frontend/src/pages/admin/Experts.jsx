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

  const categories = [...new Set(experts.map((expert) => expert.category))];
  

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
        console.error("Failed to delete expert:", error);
        alert("Failed to delete expert.");
      }
    };

  if (loading) {
    return <p className="text-lg">Loading experts...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Experts</h1>
          <p className="text-gray-500">Total Experts: {experts.length}</p>
        </div>

        <button
          onClick={() => {
            setSelectedExpert(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Expert
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search expert..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-64"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>


        <select
          value={experience}
          onChange={(e) => {
            setExperience(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Experience</option>
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
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Status</option>
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
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Experts Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Experience</th>
              <th className="text-left p-4">Rating</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {experts.map((expert) => (
              <tr key={expert._id} className="border-t hover:bg-slate-50">
                <td className="p-4">{expert.name}</td>
                <td className="p-4">{expert.category}</td>
                <td className="p-4">{expert.experience}</td>
                <td className="p-4">{expert.rating}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedExpert(expert);
                      setShowForm(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteExpert(expert._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expert Modal */}
      <ExpertModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveExpert}
        initialData={selectedExpert}
        title={selectedExpert ? "Edit Expert" : "Add Expert"}
      />
    </div>
  );
}
