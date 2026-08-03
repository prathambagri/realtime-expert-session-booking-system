import { Outlet, Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAF8" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #E2E8F0",
            padding: "0 28px",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#94A3B8",
              fontWeight: "500",
            }}
          >
            Admin Panel
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/"
              style={{
                fontSize: "13px",
                color: "#16A34A",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              ← Back to Site
            </Link>
            <UserButton afterSignOutUrl="/admin" />
          </div>
        </header>
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
