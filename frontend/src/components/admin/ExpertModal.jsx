import { useEffect, useState } from "react";

export default function ExpertModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    experience: "",
    bio: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        category: "",
        experience: "",
        bio: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-5">{title}</h2>

        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded-lg p-3 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={() => onSave(formData)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
