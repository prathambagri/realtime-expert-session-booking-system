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
    

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const data = await getAllExperts();
      setExperts(data);
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
