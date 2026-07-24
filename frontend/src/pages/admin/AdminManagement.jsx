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
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg font-medium text-slate-500">Loading Admins...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Admin Management
            </h1>

            <p className="mt-2 text-white/80">
              Manage administrator accounts and permissions.
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-px hover:shadow-lg"
          >
            <MdPersonAdd size={20} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Total Admins
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-indigo-600">
            {users.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Active Admins
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-green-600">
            {users.filter((u) => u.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Inactive Admins
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-red-600">
            {users.filter((u) => u.status === "Inactive").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            New Admins
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-sky-600">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <MdSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search admin by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-6 py-5">Admin</th>
              <th className="px-6 py-5">Email</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Joined</th>
              <th className="px-6 py-5">Last Login</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-100 transition hover:bg-indigo-50/40"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-100"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 font-bold text-white">
                        {(user.name || "A")
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-slate-900">
                        {user.name || "Unknown Admin"}
                      </p>

                      <p className="text-sm text-slate-500">Administrator</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-slate-600">{user.email}</td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {formatDate(user.createdAt)}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {formatDate(user.lastLogin)}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditOpen(true);
                      }}
                      className="rounded-xl bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                    >
                      <MdEdit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="rounded-xl bg-red-500 p-2 text-white transition hover:bg-red-600"
                    >
                      <MdBlock size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="space-y-3">
                    <div className="text-5xl">👨‍💼</div>

                    <h3 className="text-xl font-semibold text-slate-700">
                      No admins found
                    </h3>

                    <p className="text-slate-500">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUpdated={handleUserUpdated}
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
