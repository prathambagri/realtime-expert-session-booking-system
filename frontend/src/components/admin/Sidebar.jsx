import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdEventNote,
  MdManageAccounts,
  MdAdminPanelSettings,
} from "react-icons/md";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
        : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-md">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700">
          ExpertBook
        </h1>

        <p className="mt-1 text-sm text-slate-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-4">
        <NavLink to="/admin" end className={linkClasses}>
          <MdDashboard size={22} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/experts" className={linkClasses}>
          <MdPeople size={22} />
          <span>Experts</span>
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClasses}>
          <MdEventNote size={22} />
          <span>Bookings</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClasses}>
          <MdManageAccounts size={22} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/admins" className={linkClasses}>
          <MdAdminPanelSettings size={22} />
          <span>Admins</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-6 py-4">
        <p className="text-xs text-slate-400">ExpertBook Admin v1.0</p>
      </div>
    </aside>
  );
}
