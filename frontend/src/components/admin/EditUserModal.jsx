import { useEffect, useState } from "react";
import axios from "axios";

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onUpdated,
  apiUrl,
}) {
  const [form, setForm] = useState({
    name: "",
    status: "Active",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        status: user.status || "Active",
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.patch(`${apiUrl}/${user._id}`, form);

      if (data.success) {
        onUpdated(data.user || data.admin);
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg px-4 py-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
