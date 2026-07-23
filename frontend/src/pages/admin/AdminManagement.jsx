import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MdSearch, MdPersonAdd, MdEdit, MdBlock } from "react-icons/md";
import EditUserModal from "../../components/admin/EditUserModal";
import AddAdminModal from "../../components/admin/AddAdminModal";

export default function AdminManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/admins`,
        );

        setUsers(data.admins);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
    
    const handleUserUpdated = (updatedUser) => {
      setUsers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
      );
    };

    const handleDelete = async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this admin?",
      );

      if (!confirmDelete) return;

      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/admin/admins/${id}`,
        );

        if (data.success) {
          setUsers((prev) => prev.filter((admin) => admin._id !== id));
          alert("Admin deleted successfully");
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to delete admin");
      }
    };



  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading Admins...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-500 mt-1">Manage all administrators.</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          <MdPersonAdd size={20} />
          Add Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Admins</p>
          <h2 className="text-3xl font-bold mt-2 text-indigo-600">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Active Admins</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {users.filter((u) => u.status === "Active").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Inactive Admins</p>
          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {users.filter((u) => u.status === "Inactive").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">New Admins</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MdSearch
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="px-6 py-4">Admins</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined At</th>
              <th>Last Login</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                        {(user.name || "U")
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <span className="font-medium text-gray-900">
                      {user.name || "Unknown User"}
                    </span>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td>{formatDate(user.createdAt)}</td>

                <td>{formatDate(user.lastLogin)}</td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <MdEdit size={22} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdBlock size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No Admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
        onUpdated={(updatedAdmin) => {
          setUsers((prev) =>
            prev.map((admin) =>
              admin._id === updatedAdmin._id ? updatedAdmin : admin,
            ),
          );
        }}
        apiUrl={`${import.meta.env.VITE_API_URL}/api/admin/admins`}
      />

      <AddAdminModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreated={(newAdmin) => {
          setUsers((prev) => [newAdmin, ...prev]);
        }}
          />
          
    </div>
  );
}
