import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdEventNote,
  MdManageAccounts,
  MdAdminPanelSettings,
} from "react-icons/md";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🎯
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              ExpertBook
            </p>
            <p style={{ margin: 0, fontSize: "11px", color: "#94A3B8" }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {[
          {
            to: "/admin",
            icon: <MdDashboard size={20} />,
            label: "Dashboard",
            end: true,
          },
          {
            to: "/admin/experts",
            icon: <MdPeople size={20} />,
            label: "Experts",
          },
          {
            to: "/admin/bookings",
            icon: <MdEventNote size={20} />,
            label: "Bookings",
          },
          {
            to: "/admin/users",
            icon: <MdManageAccounts size={20} />,
            label: "Users",
          },
          {
            to: "/admin/admins",
            icon: <MdAdminPanelSettings size={20} />,
            label: "Admins",
          },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "4px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.15s",
              background: isActive ? "#DCFCE7" : "transparent",
              color: isActive ? "#15803D" : "#64748B",
              borderLeft: isActive
                ? "3px solid #16A34A"
                : "3px solid transparent",
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <p style={{ margin: 0, fontSize: "11px", color: "#CBD5E1" }}>
          ExpertBook Admin v1.0
        </p>
      </div>
    </aside>
  );
}
