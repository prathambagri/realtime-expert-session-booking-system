import { NavLink } from "react-router-dom";
import { MdDashboard, MdPeople, MdEventNote } from "react-icons/md";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">ExpertBook</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/admin" end className={linkClasses}>
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/experts" className={linkClasses}>
          <MdPeople size={22} />
          Experts
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClasses}>
          <MdEventNote size={22} />
          Bookings
        </NavLink>
      </nav>
    </aside>
  );
}
